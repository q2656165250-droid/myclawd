const fs = require('fs');
const htmlPath = '/home/alex/.openclaw/workspace/temp_blog_repo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. 修改主页 - 只保留新闻
const homeTabContent = `
        <div class="tab-content active" id="home-tab">
            <section class="section">
                <h2 class="section-title"><span class="icon">📰</span> 科技资讯</h2>
                <div class="news-list" id="newsList"></div>
            </section>
        </div>`;

html = html.replace(
    /<div class="tab-content active" id="home-tab">[\s\S]*?<\/div>\s*<div class="tab-content" id="zodiac-tab">/,
    homeTabContent + '\n        <div class="tab-content" id="zodiac-tab">'
);

// 2. 修改 JavaScript - 移除重复的初始化调用
html = html.replace(
    /\n        initTabNavigation\(\);\n\n        \/\/ 页面加载/,
    '\n        \n        // 页面加载'
);

// 3. 修改页面加载函数 - 确保内容渲染
const windowLoadFunction = `window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loading').classList.add('hidden');
            }, 800);

            createStars();
            initTabNavigation();
            
            // 渲染所有内容
            renderNewsList();
            renderGithubList();
            renderZodiacCards();
            renderPodcastList();
            
            updateUpdateTime();
            updateVisitorCount();
            initLike();
            getNewQuote();
        });`;

html = html.replace(
    /window\.addEventListener\('load', function\(\) \{[\s\S]*?\}\);/,
    windowLoadFunction
);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ 已修复 Tab 内容显示问题！');
console.log('✅ 主页现在只显示新闻');
console.log('✅ 其他 Tab 现在会正确渲染各自的内容');
