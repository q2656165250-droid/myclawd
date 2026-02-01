const fs = require('fs');

const htmlPath = '/home/alex/.openclaw/workspace/temp_blog_repo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. 修改新闻列表渲染函数 - 添加图片
const newsListFunction = `function renderNewsList() {
            const list = document.getElementById('newsList');
            dailyData.news.forEach((news, index) => {
                const item = document.createElement('div');
                item.className = 'news-item';
                item.style.opacity = '0';
                item.style.transform = 'translateX(-50px)';
                item.style.transition = 'all 0.5s ease';
                item.innerHTML = '<div class="news-image-wrapper"><img src="' + news.image + '" alt="' + news.title + '" class="news-image" /></div><div class="news-content"><div class="news-title">' + news.title + '</div><div class="news-meta"><span class="news-tag">' + news.tag + '</span><span>' + news.time + '</span></div><div class="news-summary">' + news.summary + '</div><div class="news-source">🔗 来源: ' + news.source + ' （点击查看详情）</div></div>';
                item.addEventListener('click', function() {
                    window.open(news.url, '_blank');
                });
                list.appendChild(item);
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 300 + index * 100);
            });
        }`;

html = html.replace(/function renderNewsList\(\) \{[\s\S]*?\n        \}/, newsListFunction);

// 2. 修改播客列表渲染函数 - 添加封面图
const podcastListFunction = `function renderPodcastList() {
            const list = document.getElementById('podcastList');
            dailyData.podcast.forEach((pod, index) => {
                const card = document.createElement('div');
                card.className = 'podcast-card';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.5s ease';
                card.innerHTML = '<div class="podcast-cover-wrapper"><img src="' + pod.cover + '" alt="' + pod.title + '" class="podcast-cover" /><div class="podcast-play-icon">▶</div></div><div class="podcast-info"><div class="podcast-title">' + pod.title + '</div><div class="podcast-desc">' + pod.desc + '</div><div class="podcast-meta"><span>👤 ' + pod.author + '</span><span>⏱️ ' + pod.duration + '</span><span>📊 ' + pod.episodes + '期</span></div></div>';
                card.addEventListener('click', function() {
                    window.open(pod.url, '_blank');
                });
                list.appendChild(card);
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 600 + index * 150);
            });
        }`;

html = html.replace(/function renderPodcastList\(\) \{[\s\S]*?\n        \}/, podcastListFunction);

// 3. 修改 GitHub 项目渲染函数 - 添加项目图标
const githubListFunction = `function renderGithubList() {
            const list = document.getElementById('githubList');
            dailyData.githubTrending.forEach((repo, index) => {
                const card = document.createElement('div');
                card.className = 'github-card';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.5s ease';
                card.innerHTML = '<div class="github-image-wrapper"><img src="' + repo.image + '" alt="' + repo.name + '" class="github-image" /></div><div class="github-name">' + repo.name + '</div><div class="github-desc">' + repo.description + '</div><div class="github-meta"><div class="github-stars">⭐ ' + repo.stars + '</div><div class="github-lang"><span>' + repo.language + '</span></div></div>';
                card.addEventListener('click', function() {
                    window.open(repo.url, '_blank');
                });
                list.appendChild(card);
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 500 + index * 150);
            });
        }`;

html = html.replace(/function renderGithubList\(\) \{[\s\S]*?\n        \}/, githubListFunction);

// 4. 修改星座卡片渲染函数 - 添加背景图
const zodiacCardFunction = `function renderZodiacCards() {
            const grid = document.getElementById('zodiacGrid');
            dailyData.zodiac.forEach((zodiac, index) => {
                const card = document.createElement('div');
                card.className = 'zodiac-card-small';
                card.style.backgroundImage = 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)), url(' + zodiac.image + ')';
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
                card.innerHTML = '<div class="zodiac-icon-small">' + zodiac.icon + '</div><div class="zodiac-name-small">' + zodiac.name + '</div><div class="zodiac-date-small">' + zodiac.date + '</div><div class="zodiac-luck-small"><span class="luck-stars-small">' + generateLuckStars(zodiac.luck) + '</span></div><div class="zodiac-desc-small">' + zodiac.desc + '</div>';
                card.addEventListener('click', function() {
                    openZodiacModal(zodiac);
                });
                grid.appendChild(card);
            });
        }`;

html = html.replace(/function renderZodiacCards\(\) \{[\s\S]*?\n        \}/, zodiacCardFunction);

// 5. 添加 CSS 样式
const newsStyles = `
        .news-item {
            display: flex;
            gap: 20px;
        }

        .news-image-wrapper {
            flex-shrink: 0;
            width: 200px;
            height: 140px;
            border-radius: 10px;
            overflow: hidden;
        }

        .news-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .news-item:hover .news-image {
            transform: scale(1.05);
        }

        .news-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        @media (max-width: 768px) {
            .news-item {
                flex-direction: column;
            }

            .news-image-wrapper {
                width: 100%;
                height: 180px;
            }
        }
`;

const podcastStyles = `
        .podcast-card {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .podcast-cover-wrapper {
            position: relative;
            flex-shrink: 0;
            width: 100px;
            height: 100px;
            border-radius: 10px;
            overflow: hidden;
        }

        .podcast-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .podcast-play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .podcast-card:hover .podcast-play-icon {
            opacity: 1;
        }

        .podcast-card:hover .podcast-cover {
            transform: scale(1.05);
        }

        .podcast-info {
            flex: 1;
        }

        .podcast-icon {
            display: none;
        }

        @media (max-width: 768px) {
            .podcast-card {
                flex-direction: column;
                text-align: center;
            }

            .podcast-cover-wrapper {
                width: 120px;
                height: 120px;
            }
        }
`;

const githubStyles = `
        .github-image-wrapper {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 15px;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .github-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .github-icon {
            display: none;
        }
`;

// 在 </style> 标签之前添加新样式
html = html.replace(/<\/style>/, newsStyles + podcastStyles + githubStyles + '\n    </style>');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ HTML 文件已更新，图片显示功能已添加！');
