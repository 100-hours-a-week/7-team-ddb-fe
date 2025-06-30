#!/bin/bash
set -e

echo "▶ 이전 컨테이너 중지 및 삭제"
docker stop frontend || true
docker rm frontend || true