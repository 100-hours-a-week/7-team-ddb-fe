pipeline {
    agent any

    environment {
        SERVICE_NAME    = 'frontend'
        PROJECT_ID      = 'velvety-calling-458402-c1'
        REGION          = 'asia-northeast3'
        GAR_HOST        = 'asia-northeast3-docker.pkg.dev'
        CONTAINER_NAME  = 'frontend'
        PORT            = '3000'
        SSH_KEY_PATH    = '/var/jenkins_home/.ssh/id_rsa'
        SSH_USER        = 'peter'
    }

    stages {
        stage('Set Branch & Cron Trigger') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME ?: env.GIT_BRANCH?.replaceFirst(/^origin\//, '')
                    env.BRANCH = branchName

                    if (branchName == 'main') {
                        properties([pipelineTriggers([cron('30 0 * * 1-5')])])
                    } else if (branchName == 'dev') {
                        properties([pipelineTriggers([
                            cron('30 3 * * 1-4'),
                            cron('0 1 * * 5'),
                            cron('30 3 * * 6,7')
                        ])])
                    } else {
                        properties([pipelineTriggers([])])
                        echo "⛔ 지원되지 않는 브랜치입니다: ${branchName}. 빌드를 중단합니다."
                        currentBuild.result = 'NOT_BUILT'
                        error("Unsupported branch: ${branchName}")
                    }
                }
            }
        }

        stage('Notify Before Start') {
            when {
                expression { env.BRANCH in ['main', 'dev'] }
            }
            steps {
                script {
                    withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
                        discordSend(
                            description: "🚀 배포가 곧 시작됩니다: ${env.SERVICE_NAME} - ${env.BRANCH} 브랜치",
                            link: env.BUILD_URL,
                            title: "배포 시작",
                            webhookURL: "$DISCORD"
                        )
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Environment by Branch') {
            steps {
                script {
                    if (env.BRANCH == 'main') {
                        env.FE_PRIVATE_IP = '10.10.20.2'
                        env.ENV_LABEL = 'prod'
                        env.REPO_NAME = 'dolpin-docker-image-prod'
                        env.API_BASE_CRED_ID = 'NEXT_PUBLIC_API_BASE_PROD'
                    } else {
                        env.FE_PRIVATE_IP = '10.20.20.2'
                        env.ENV_LABEL = 'dev'
                        env.REPO_NAME = 'dolpin-docker-image-dev'
                        env.API_BASE_CRED_ID = 'NEXT_PUBLIC_API_BASE_DEV'
                    } 

                    env.TAG = "${env.SERVICE_NAME}:${env.BUILD_NUMBER}"
                    env.GAR_IMAGE = "${env.GAR_HOST}/${env.PROJECT_ID}/${env.REPO_NAME}/${env.TAG}"
                }
            }
        }

        stage('Load Secrets') {
            steps {
                script {
                    // Jenkins Credential Plugin을 통해 환경변수 로드
                    withCredentials([
                        string(credentialsId: "${env.API_BASE_CRED_ID}", variable: 'API_BASE_URL'),
                        string(credentialsId: 'NEXT_PUBLIC_KAKAOMAP_KEY', variable: 'KAKAOMAP_KEY')
                    ]) {
                        env.API_BASE_URL = API_BASE_URL
                        env.KAKAOMAP_KEY = KAKAOMAP_KEY
                    }
                }
            }
        }


        stage('GAR 인증') {
            steps {
                sh "gcloud auth configure-docker ${env.GAR_HOST} --quiet"
            }
        }

        stage('Docker Build & Push to GAR') {
            steps {
                sh """
                    docker build \
                      --build-arg NEXT_PUBLIC_API_BASE_URL=${env.API_BASE_URL} \
                      --build-arg NEXT_PUBLIC_KAKAOMAP_KEY=${env.KAKAOMAP_KEY} \
                      -t ${env.GAR_IMAGE} .
                    docker push ${env.GAR_IMAGE}
                """
            }
        }

        stage('Deploy to FE via SSH') {
            steps {
                script {
                    def saCredId = env.BRANCH == 'main' ? 'fe-sa-key-prod' : 'fe-sa-key-dev'

                    // GCP Secret Manager에서 서비스 계정 키 다운로드
                    sh """
                    gcloud secrets versions access latest \
                    --secret="${saCredId}" \
                    --project="${env.PROJECT_ID}" > gcp-key.json
                    """

                    def deployScript = """
#!/bin/bash
set -e

export HOME=/home/${env.SSH_USER}

mv /tmp/gcp-key.json \$HOME/gcp-key.json
chown ${env.SSH_USER}:${env.SSH_USER} \$HOME/gcp-key.json
chmod 600 \$HOME/gcp-key.json

# 서비스 계정 인증 및 docker 인증
gcloud auth activate-service-account --key-file="\$HOME/gcp-key.json"
gcloud config set project ${env.PROJECT_ID} --quiet
gcloud auth configure-docker ${env.GAR_HOST} --quiet
gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin https://${env.GAR_HOST}

sudo docker stop ${env.CONTAINER_NAME} || true
sudo docker rm ${env.CONTAINER_NAME} || true

docker pull ${env.GAR_IMAGE}

sudo docker run -d --name ${env.CONTAINER_NAME} \\
  -p ${env.PORT}:${env.PORT} \\
  ${env.GAR_IMAGE}
"""
                    // Jenkins 워크스페이스에 배포 스크립트 파일 저장
                    writeFile file: 'deploy.sh', text: deployScript
                    sh "chmod 600 ${env.SSH_KEY_PATH}"
                    
                    // 키와 스크립트 전송 후 실행
                    sh """
scp -i ${env.SSH_KEY_PATH} -o StrictHostKeyChecking=no gcp-key.json ${env.SSH_USER}@${env.FE_PRIVATE_IP}:/tmp/gcp-key.json
scp -i ${env.SSH_KEY_PATH} -o StrictHostKeyChecking=no deploy.sh ${env.SSH_USER}@${env.FE_PRIVATE_IP}:/tmp/deploy.sh

ssh -tt -i ${env.SSH_KEY_PATH} -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.FE_PRIVATE_IP} "bash /tmp/deploy.sh"
"""
                }
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH in ['main', 'dev']) {
                    withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
                        discordSend description: """
                        제목 : ${currentBuild.displayName}
                        결과 : ${currentBuild.result}
                        실행 시간 : ${currentBuild.duration / 1000}s
                        """,
                        link: env.BUILD_URL, result: currentBuild.currentResult,
                        title: "${env.JOB_NAME} : ${currentBuild.displayName} 성공",
                        webhookURL: "$DISCORD"
                    }
                }
            }
        }
        failure {
            script {
                if (env.BRANCH in ['main', 'dev']) {
                    withCredentials([string(credentialsId: 'Discord-Webhook', variable: 'DISCORD')]) {
                        discordSend description: """
                        제목 : ${currentBuild.displayName}
                        결과 : ${currentBuild.result}
                        실행 시간 : ${currentBuild.duration / 1000}s
                        """,
                        link: env.BUILD_URL, result: currentBuild.currentResult,
                        title: "${env.JOB_NAME} : ${currentBuild.displayName} 실패",
                        webhookURL: "$DISCORD"
                    }
                }
            }
        }
    }
}
