const fs = require('fs');
const path = require('path');

const htmlPath = '/home/alex/.openclaw/workspace/temp_blog_repo/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// 生成 6 个播客数据
function generatePodcasts() {
    return [
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
}

// 更新 podcast 数据
function updatePodcastData() {
    const podcastData = generatePodcasts();
    
    // 构建新数据
    const dailyDataMatch = html.match(/const dailyData = \{[\s\S]*?\};[\s\n\r]*\/\/ === 每日数据结束/);
    if (dailyDataMatch) {
        const dailyDataStr = dailyDataMatch[0];
        const dataObjStr = dailyDataStr.replace('const dailyData = ', '').replace(/;[\s\n\r]*\/\/ === 每日数据结束/, '');
        const dataObj = JSON.parse(dataObjStr);
        
        // 更新 podcast 数据
        dataObj.podcast = podcastData;
        
        // 构建新的 dailyData 字符串
        const newDailyDataStr = JSON.stringify(dataObj, null, 8);
        const newDailyDataFull = `const dailyData = ${newDailyDataStr};\n        // === 每日数据结束`;
        
        html = html.replace(/const dailyData = \{[\s\S]*?\};[\s\n\r]*\/\/ === 每日数据结束/, newDailyDataFull);
    }
}

updatePodcastData();

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ 播客数据已更新！');
console.log(`🎙️ 播客频道数量：6 个`);
console.log(`
1. 🎙️ 科技前沿 - 深度科技分析
2. 🎧 游戏风云 - 玩家必听
3. 📻 生活百态 - 治愈系
4. 🎵 音乐漫步 - 耳朵旅行
5. 🌍 旅行日记 - 听见世界
6. 🎬 影视评论 - 深度解析
`);
