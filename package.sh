#!/bin/bash

# 获取当前脚本文件名
SCRIPT_NAME=$(basename "$0")
# 获取当前目录名
PROJECT_DIR=$(basename "$(pwd)")
# 获取上级目录
PARENT_DIR=$(dirname "$(pwd)")
# 获取当前日期
DATE=$(date +%Y%m%d-%H%M)
# 新目录名
NEW_DIR="${PROJECT_DIR}-${DATE}"

# 切换到项目根目录
cd "$(pwd)"

# 创建目标目录
mkdir -p "${PARENT_DIR}/${NEW_DIR}"

# 复制文件，排除以.开头的文件夹和脚本自身
rsync -av --exclude='.*' --exclude="${SCRIPT_NAME}" ./ "${PARENT_DIR}/${NEW_DIR}/"

echo "已复制到："
echo "${PARENT_DIR}/${NEW_DIR}"