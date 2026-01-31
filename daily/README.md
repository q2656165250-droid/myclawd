# 每日数据更新仓库

## 说明

此仓库用于存储每日更新的博客数据，包括：
- 12星座今日运势
- 每日科技资讯
- GitHub 热门项目 TOP 3

## 文件结构

- `daily-data.json` - 每日数据文件
- `update.sh` - 更新脚本
- `README.md` - 说明文档

## 数据格式

### daily-data.json

```json
{
  "updateDate": "2026-01-31",
  "zodiac": [...],      // 12星座运势数据
  "news": [...],        // 每日资讯数据
  "githubTrending": [...] // GitHub热门项目
}
```

## 每日更新流程

1. 获取最新星座运势数据
2. 获取最新科技资讯
3. 获取GitHub热门项目TOP 3
4. 更新 daily-data.json
5. 提交到git仓库
6. 同步到主博客仓库

## 自动化

每天上午8点（北京时间）自动触发更新。

## 联系方式

alex
