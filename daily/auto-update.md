# 自动更新任务说明

## 每日更新内容

1. **星座运势** - 12星座今日运势（整体、爱情、事业、财运）
2. **科技资讯** - 获取5条最新科技/互联网资讯
3. **GitHub 热门项目** - 获取今日最火的3个项目

## 更新流程

1. 使用 web_search 搜索最新科技资讯
2. 使用 gh CLI 获取 GitHub Trending
3. 生成星座运势数据（可以是随机或模板化）
4. 更新 daily-data.json
5. 更新主博客 index.html
6. git add, commit, push

## 文件路径

- 数据文件：/workspace/daily/daily-data.json
- 博客文件：/workspace/index.html
- Git 仓库：/workspace (主仓库) 和 /workspace/daily (数据仓库)

## 执行时间

每天上午8点（北京时间）自动执行
