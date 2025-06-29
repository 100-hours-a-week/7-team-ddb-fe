#!/bin/bash
set -e

IMAGE=$(cat /home/ubuntu/app/.image_ref)
PORT=3000
CONTAINER_NAME=frontend

echo "▶ 실행할 이미지: $IMAGE"

# 컨테이너 실행
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart=always \
  -p "$PORT:$PORT" \
  "$IMAGE"