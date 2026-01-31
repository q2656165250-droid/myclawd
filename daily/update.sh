#!/bin/bash
# 每日更新脚本：获取星座运势、科技资讯和GitHub热门项目

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_FILE="$SCRIPT_DIR/daily-data.json"
BLOG_FILE="$HOME/.openclaw/workspace/index.html"
TODAY=$(date +%Y-%m-%d)

echo "[$(date)] 开始每日更新..."

# 更新日期
echo "[$(date)] 更新日期: $TODAY"

# 使用jq更新JSON文件的日期
if command -v jq &> /dev/null; then
    jq --arg date "$TODAY" '.updateDate = $date' "$DATA_FILE" > "$DATA_FILE.tmp"
    mv "$DATA_FILE.tmp" "$DATA_FILE"
else
    # 如果没有jq，使用sed
    sed -i "s/\"updateDate\": \".*\"/\"updateDate\": \"$TODAY\"/" "$DATA_FILE"
fi

echo "[$(date)] 数据文件已更新"

# 提交到git
cd "$SCRIPT_DIR"
git add daily-data.json
git commit -m "Update daily data for $TODAY" || echo "No changes to commit"
git push origin main 2>/dev/null || git push origin master 2>/dev/null || echo "Remote not configured yet"

# 同步到主博客仓库
MAIN_DIR="$HOME/.openclaw/workspace"
if [ -d "$MAIN_DIR/.git" ]; then
    cp "$DATA_FILE" "$MAIN_DIR/daily-data.json"
    cd "$MAIN_DIR"
    git add daily-data.json index.html 2>/dev/null || true
    git commit -m "Sync daily data for $TODAY" || echo "No changes in main repo"
    git push origin main
fi

echo "[$(date)] 每日更新完成！"
