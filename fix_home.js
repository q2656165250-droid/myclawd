const fs = require('fs');
const htmlPath = '/home/alex/.openclaw/workspace/temp_blog_repo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 找到主页 tab 中的额外 section 并删除
// 主页应该只有 GitHub 和新闻，其他应该删除

// 找到主页中的播客和星座 section，删除它们
html = html.replace(
    /(<\/section>\s*)(<section class="section">\s*<h2 class="section-title"><span class="icon">🎙️<\/span> 播客频道<\/h2>[\s\S]*?<\/section>\s*)(<section class="section">\s*<h2 class="section-title"><span class="icon">⭐<\/span> 12星座今日运势<\/h2>[\s\S]*?<\/section>)(\s*<div class="tab-content" id="zodiac-tab">)/,
    '$1\n        <div class="tab-content" id="zodiac-tab">'
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ 已删除主页的重复内容！');
console.log('✅ 主页现在只显示 GitHub 和新闻');
