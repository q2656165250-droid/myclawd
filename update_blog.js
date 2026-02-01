#!/usr/bin/env node

/**
 * 每日博客自动更新脚本（带图片版本）
 * 功能：更新星座运势、新闻、GitHub项目、播客，包含图片
 */

const fs = require('fs');
const path = require('path');

// 星座运势生成器（基于日期伪随机，保持同一天运势一致）
function generateZodiacFortune(date) {
    const zodiacNames = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
                        '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
    const zodiacIcons = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    const zodiacDates = ['3/21-4/19', '4/20-5/20', '5/21-6/21', '6/22-7/22', '7/23-8/22',
                         '8/23-9/22', '9/23-10/23', '10/24-11/22', '11/23-12/21',
                         '12/22-1/19', '1/20-2/18', '2/19-3/20'];
    
    // 星座图片 URL（使用 Unsplash 图片）
    const zodiacImages = [
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=300&fit=crop', // 白羊
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop', // 金牛
        'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop', // 双子
        'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop', // 巨蟹
        'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=300&fit=crop', // 狮子
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop', // 处女
        'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=400&h=300&fit=crop', // 天秤
        'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop', // 天蝎
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop', // 射手
        'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400&h=300&fit=crop', // 摩羯
        'https://images.unsplash.com/photo-1454789548728-852313a75ee9?w=400&h=300&fit=crop', // 水瓶
        'https://images.unsplash.com/photo-1502899576159-f224dc2349fa?w=400&h=300&fit=crop'  // 双鱼
    ];

    const fortuneTemplates = [
        '今天精力充沛，适合开始新计划。工作上会有突破性进展，保持积极心态。',
        '财务运势不错，但不要冲动消费。健康方面注意休息，避免过度劳累。',
        '沟通运势极佳，适合与人交流。今天可能收到好消息，心情愉快。',
        '家庭运势旺盛，适合与家人共度时光。情绪稳定，适合做重要决定。',
        '今天魅力四射，社交活动会很顺利。工作上可能会得到表扬。',
        '工作效率高，但要注意细节。感情方面可能需要耐心沟通。',
        '人际关系和谐，适合合作。今天你的直觉会很敏锐，做决定时会更加明智。',
        '洞察力强，适合做分析和决策。今天可能会有意外收获。',
        '自由意志强烈，适合规划未来。旅行运不错，可以考虑短途出行。',
        '工作运稳定，但需要耐心。健康方面注意适当运动，保持活力。',
        '创意灵感爆棚，适合创新项目。今天可能会遇到志同道合的朋友。',
        '直觉敏锐，适合做直觉性判断。艺术方面运势不错，可以发挥创造力。'
    ];

    // 使用日期作为种子
    const seed = date.split('-').join('').slice(2);
    const baseNum = parseInt(seed);

    const zodiacData = zodiacNames.map((name, i) => {
        // 基于日期和星座索引生成伪随机数
        const random = ((baseNum * (i + 1)) % 5) + 1;
        const fortuneIndex = ((baseNum + i) % fortuneTemplates.length);

        return {
            icon: zodiacIcons[i],
            name: name,
            date: zodiacDates[i],
            image: zodiacImages[i],
            luck: random,
            love: ((baseNum + i * 2) % 5) + 1,
            career: ((baseNum + i * 3) % 5) + 1,
            wealth: ((baseNum + i * 4) % 5) + 1,
            desc: fortuneTemplates[fortuneIndex]
        };
    });

    return zodiacData;
}

// 模拟新闻数据（带图片）
function generateNews(date) {
    const newsTemplates = [
        {
            title: '全球科技发展迎来新突破，AI应用场景持续扩展',
            tag: '科技',
            summary: '最新研究显示，人工智能技术在医疗、教育等领域的应用取得显著进展，为行业发展注入新动力。',
            source: '科技日报',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
        },
        {
            title: '绿色能源产业蓬勃发展，可持续发展理念深入人心',
            tag: '环保',
            summary: '随着环保意识提升，新能源产业持续增长，多个项目投入建设，推动绿色转型。',
            source: '环保新闻网',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=400&fit=crop'
        },
        {
            title: '太空探索取得新进展，国际合作助力人类探索宇宙',
            tag: '航天',
            summary: '各国航天合作不断深化，新的探索计划陆续启动，人类对宇宙的认知持续加深。',
            source: '航天科技报',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=400&fit=crop'
        },
        {
            title: '数字经济蓬勃发展，新业态新模式不断涌现',
            tag: '经济',
            summary: '数字化转型加速推进，新商业模式层出不穷，为经济增长提供新动能。',
            source: '经济日报',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop'
        },
        {
            title: '文化产业创新发展，优秀传统文化焕发新活力',
            tag: '文化',
            summary: '传统文化与现代科技深度融合，新表达形式让文化传播更加生动有趣。',
            source: '文化周刊',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800&h=400&fit=crop'
        },
        {
            title: '健康生活理念普及，全民健身运动持续升温',
            tag: '健康',
            summary: '越来越多的人关注身心健康，科学健身方法得到广泛推广和应用。',
            source: '健康时报',
            url: 'https://example.com',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop'
        }
    ];

    // 基于日期打乱顺序
    const seed = parseInt(date.split('-').join('').slice(2));
    return newsTemplates.map((item, i) => ({
        ...item,
        time: `${(i + 1)}小时前`
    }));
}

// 生成 GitHub 项目数据（带图片）
function generateGithubTrending(date) {
    const repos = [
        {
            name: 'golang/go',
            description: 'The Go programming language',
            stars: '120k',
            language: 'Go',
            url: 'https://github.com/golang/go',
            image: 'https://raw.githubusercontent.com/golang/go/master/doc/gopher-favicon.png'
        },
        {
            name: 'vercel/next.js',
            description: 'The React Framework - 用于构建全栈 Web 应用的 React 框架',
            stars: '125k',
            language: 'JavaScript',
            url: 'https://github.com/vercel/next.js',
            image: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg'
        },
        {
            name: 'facebook/react',
            description: 'A JavaScript library for building user interfaces',
            stars: '220k',
            language: 'JavaScript',
            url: 'https://github.com/facebook/react',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
        }
    ];
    return repos;
}

// 生成播客数据（带封面图）
function generatePodcast(date) {
    const podcasts = [
        {
            icon: '🎙️',
            title: '科技前沿',
            desc: '每周更新，深入分析AI、芯片、新能源、生物科技等前沿领域。特邀行业专家访谈，技术发展趋势预测。',
            url: 'https://example.com/podcast1',
            author: '科技观察',
            duration: '45分钟',
            episodes: 128,
            cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop'
        },
        {
            icon: '🎧',
            title: '游戏风云',
            desc: '热门游戏评测，独立游戏推荐，玩家社区讨论。游戏行业动态，开发者访谈，电竞赛事分析。',
            url: 'https://example.com/podcast2',
            author: '游戏玩家',
            duration: '60分钟',
            episodes: 256,
            cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0e?w=400&h=400&fit=crop'
        },
        {
            icon: '📻',
            title: '生活百态',
            desc: '每日生活感悟，人生哲理分享，心灵成长故事。职场建议，人际关系，心理健康，让每一天更有意义。',
            url: 'https://example.com/podcast3',
            author: '生活家',
            duration: '30分钟',
            episodes: 64,
            cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop'
        },
        {
            icon: '🎵',
            title: '音乐漫步',
            desc: '从古典到流行，从民谣到电子，探索音乐的世界。乐队故事，专辑推荐，音乐人访谈，音乐背后的故事。',
            url: 'https://example.com/podcast4',
            author: '音乐探索者',
            duration: '50分钟',
            episodes: 89,
            cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop'
        },
        {
            icon: '🌍',
            title: '旅行日记',
            desc: '世界各地的旅行故事，文化探索，美食推荐。独行侠分享，情侣旅行，亲子游，不同视角看世界。',
            url: 'https://example.com/podcast5',
            author: '旅行家',
            duration: '40分钟',
            episodes: 156,
            cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop'
        },
        {
            icon: '🎬',
            title: '影视评论',
            desc: '电影、电视剧、动漫、纪录片评论。导演风格分析，演员访谈，影视行业动态，经典重映。',
            url: 'https://example.com/podcast6',
            author: '影评人',
            duration: '55分钟',
            episodes: 203,
            cover: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=400&fit=crop'
        }
    ];
    return podcasts;
}

// 更新index.html中的数据
function updateBlogData(dateStr) {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');

    // 生成新数据
    const zodiacData = generateZodiacFortune(dateStr);
    const newsData = generateNews(dateStr);
    const githubData = generateGithubTrending(dateStr);
    const podcastData = generatePodcast(dateStr);

    // 更新 dailyData 对象
    const dailyData = {
        updateDate: dateStr,
        news: newsData,
        githubTrending: githubData,
        zodiac: zodiacData,
        podcast: podcastData
    };

    const dailyDataStr = JSON.stringify(dailyData, null, 8);

    // 替换 dailyData
    content = content.replace(
        /const dailyData = \{[\s\S]*?\};[\s\n\r]*\/\/ === 每日数据结束/,
        `const dailyData = ${dailyDataStr};\n        // === 每日数据结束`
    );

    // 更新时间显示
    const dateObj = new Date();
    const formattedDateStr = dateObj.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    content = content.replace(
        /更新时间：<span id="updateTime">.*?<\/span>/,
        `更新时间：<span id="updateTime">${formattedDateStr}</span>`
    );

    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ 博客数据已更新：${dateStr}`);
    console.log(`📊 星座运势：${zodiacData.length} 个星座`);
    console.log(`📰 新闻资讯：${newsData.length} 条`);
    console.log(`🔥 GitHub 项目：${githubData.length} 个`);
    console.log(`🎙️ 播客频道：${podcastData.length} 个`);
}

// 主函数
function main() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`🚀 开始更新博客数据...`);
    updateBlogData(today);
    console.log(`✨ 更新完成！`);
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = { generateZodiacFortune, generateNews, generateGithubTrending, generatePodcast, updateBlogData };
