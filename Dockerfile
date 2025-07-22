# 1단계: 빌드 스테이지
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# 소스 코드 복사
COPY . .

# 빌드 타임 환경변수 인자 정의
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_KAKAOMAP_KEY
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_SITE_URL

# 빌드 시점 환경변수로 사용될 수 있도록 ENV로 설정
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_KAKAOMAP_KEY=$NEXT_PUBLIC_KAKAOMAP_KEY
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Next.js 빌드 
RUN pnpm run build

# 2단계: 런타임 스테이지
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
