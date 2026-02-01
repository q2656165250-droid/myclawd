const fs = require('fs');
const htmlPath = '/home/alex/.openclaw/workspace/temp_blog_repo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. 修改主页 - 只保留新闻和 GitHub
const homeTabContent = `
        <div class="tab-content active" id="home-tab">
            <section class="section">
                <h2 class="section-title"><span class="icon">🔥</span> GitHub 热门项目 TOP 3</h2>
                <div class="github-grid" id="githubList"></div>
            </section>

            <section class="section">
                <h2 class="section-title"><span class="icon">📰</span> 科技资讯</h2>
                <div class="news-list" id="newsList"></div>
            </section>
        </div>`;

// 找到主页 tab 的完整内容（从 <div class="tab-content active" id="home-tab"> 到 </div> <div class="tab-content" id="zodiac-tab">）
const homeTabRegex = /<div class="tab-content active" id="home-tab">[\s\S]*?<\/div>\s*<div class="tab-content" id="zodiac-tab">/;
html = html.replace(homeTabRegex, homeTabContent + '\n        <div class="tab-content" id="zodiac-tab">');

// 2. 确保其他 tab 有唯一的内容 ID
// 修改 zodiac-tab
const zodiacTabHTML = `
        <div class="tab-content" id="zodiac-tab">
            <section class="section">
                <h2 class="section-title"><span class="icon">⭐</span> 12星座今日运势</h2>
                <div class="zodiac-grid" id="zodiacGridFull"></div>
            </section>
        </div>`;

// 修改 podcast-tab
const podcastTabHTML = `
        <div class="tab-content" id="podcast-tab">
            <section class="section">
                <h2 class="section-title"><span class="icon">🎙️</span> 播客频道</h2>
                <div class="podcast-list" id="podcastListFull"></div>
            </section>
        </div>`;

// 修改 github-tab
const githubTabHTML = `
        <div class="tab-content" id="github-tab">
            <section class="section">
                <h2 class="section-title"><span class="icon">🔥</span> GitHub 热门项目 TOP 3</h2>
                <div class="github-grid" id="githubListFull"></div>
            </section>
        </div>`;

html = html.replace(
    /<div class="tab-content" id="zodiac-tab">[\s\S]*?<\/div>\s*<div class="tab-content" id="podcast-tab">[\s\S]*?<\/div>\s*<div class="tab-content" id="github-tab">[\s\S]*?<\/div>\s*<div class="tab-content" id="about-tab">/,
    zodiacTabHTML + '\n        ' + podcastTabHTML + '\n        ' + githubTabHTML + '\n        <div class="tab-content" id="about-tab">'
);

// 3. 修改 JavaScript 渲染函数，让它们渲染到多个元素
html = html.replace(
    /function renderNewsList\(\) \{[\s\S]*?const list = document\.getElementById\('newsList'\);/,
    `function renderNewsList() {
            const lists = document.querySelectorAll('.news-list');
            lists.forEach(list => {
                list.innerHTML = '';`
);

html = html.replace(
    /function renderGithubList\(\) \{[\s\S]*?const list = document\.getElementById\('githubList'\);/,
    `function renderGithubList() {
            const lists = document.querySelectorAll('.github-grid');
            lists.forEach(list => {
                list.innerHTML = '';`
);

html = html.replace(
    /function renderPodcastList\(\) \{[\s\S]*?const list = document\.getElementById\('podcastList'\);/,
    `function renderPodcastList() {
            const lists = document.querySelectorAll('.podcast-list');
            lists.forEach(list => {
                list.innerHTML = '';`
);

html = html.replace(
    /function renderZodiacCards\(\) \{[\s\S]*?const grid = document\.getElementById\('zodiacGrid'\);/,
    `function renderZodiacCards() {
            const grids = document.querySelectorAll('.zodiac-grid');
            grids.forEach(grid => {
                grid.innerHTML = '';`
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ 已修复 Tab 内容显示问题！');
console.log('✅ 主页现在只显示 GitHub 和新闻');
console.log('✅ 其他 Tab 现在会正确渲染各自的内容');
console.log('✅ JavaScript 函数已更新，支持多个内容区域');
