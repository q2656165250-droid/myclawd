#!/usr/bin/env node

/**
 * 每日博客自动更新脚本
 * 功能：更新星座运势和每日新闻
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
            luck: random,
            desc: fortuneTemplates[fortuneIndex]
        };
    });

    return zodiacData;
}

// 模拟新闻数据（实际应用中可接入API）
function generateNews(date) {
    const newsTemplates = [
        {
            title: '全球科技发展迎来新突破，AI应用场景持续扩展',
            tag: '科技',
            summary: '最新研究显示，人工智能技术在医疗、教育等领域的应用取得显著进展，为行业发展注入新动力。'
        },
        {
            title: '绿色能源产业蓬勃发展，可持续发展理念深入人心',
            tag: '环保',
            summary: '随着环保意识提升，新能源产业持续增长，多个项目投入建设，推动绿色转型。'
        },
        {
            title: '太空探索取得新进展，国际合作助力人类探索宇宙',
            tag: '航天',
            summary: '各国航天合作不断深化，新的探索计划陆续启动，人类对宇宙的认知持续加深。'
        },
        {
            title: '数字经济蓬勃发展，新业态新模式不断涌现',
            tag: '经济',
            summary: '数字化转型加速推进，新商业模式层出不穷，为经济增长提供新动能。'
        },
        {
            title: '文化产业创新发展，优秀传统文化焕发新活力',
            tag: '文化',
            summary: '传统文化与现代科技深度融合，新表达形式让文化传播更加生动有趣。'
        }
    ];

    // 基于日期打乱顺序
    const seed = parseInt(date.split('-').join('').slice(2));
    return newsTemplates.map((item, i) => ({
        ...item,
        time: `${(i + 1) * 2}小时前`
    }));
}

// 更新index.html中的数据
function updateBlogData(dateStr) {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');

    // 生成新数据
    const zodiacData = generateZodiacFortune(dateStr);
    const newsData = generateNews(dateStr);

    // 更新星座数据
    const zodiacJSArray = JSON.stringify(zodiacData, null, 12);
    content = content.replace(
        /const zodiacData = \[[\s\S]*?\];/,
        `const zodiacData = ${zodiacJSArray};`
    );

    // 更新新闻数据
    const newsJSArray = JSON.stringify(newsData, null, 12);
    content = content.replace(
        /const newsData = \[[\s\S]*?\];/,
        `const newsData = ${newsJSArray};`
    );

    // 更新时间显示
    const dateObj = new Date();
    const dateStr = dateObj.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    content = content.replace(
        /更新时间：<span id="updateTime">.*?<\/span>/,
        `更新时间：<span id="updateTime">${dateStr}</span>`
    );

    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ 博客数据已更新：${dateStr}`);
    console.log(`📊 星座运势：${zodiacData.length} 个星座`);
    console.log(`📰 新闻资讯：${newsData.length} 条`);
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

module.exports = { generateZodiacFortune, generateNews, updateBlogData };
