/**
 * 模板文件生成工具
 * @author my-cli
 */

const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const logger = require('./logger');
const { executeWithProgress } = require('./spinner');

/**
 * 延迟函数
 * @param {number} ms 延迟毫秒数
 * @returns {Promise<void>}
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 从模板生成项目
 * @param {string} src 模板路径
 * @param {string} dest 目标路径
 * @param {object} metadata 模板变量
 * @returns {Promise<void>}
 */
const generate = async (src, dest, metadata = {}) => {
    if (!fs.existsSync(src)) {
        logger.error(`模板目录不存在: ${src}`);
        return;
    }

    // 复制整个目录结构
    await executeWithProgress('复制项目文件', async (updateProgress) => {
        // 模拟复制过程的进度
        for (let i = 0; i <= 30; i += 5) {
            updateProgress(i, `准备复制文件 ${i}%`);
            await delay(100);
        }

        await fs.copy(src, dest);
        updateProgress(40, '文件复制完成');
        await delay(300);

        // 获取目标目录中的所有文件
        const files = await getAllFiles(dest);
        logger.info(`找到 ${files.length} 个文件需要处理`);
        await delay(300);

        updateProgress(50, '开始处理模板变量');
        await delay(300);

        // 处理模板变量
        let processed = 0;
        for (const file of files) {
            try {
                if (file.endsWith('.js') ||
                    file.endsWith('.jsx') ||
                    file.endsWith('.ts') ||
                    file.endsWith('.tsx') ||
                    file.endsWith('.vue') ||
                    file.endsWith('.html') ||
                    file.endsWith('.json') ||
                    file.endsWith('.md')) {
                    const content = await fs.readFile(file, 'utf8');
                    // 使用Handlebars处理模板变量
                    const template = Handlebars.compile(content);
                    const result = template(metadata);
                    await fs.writeFile(file, result);
                }
                processed++;
                const progress = 50 + Math.floor((processed / files.length) * 50);
                updateProgress(progress, `正在处理文件 ${processed}/${files.length}`);

                // 每处理几个文件添加一点延迟，使进度条更明显
                if (processed % 3 === 0 || processed === files.length) {
                    await delay(150);
                }
            } catch (err) {
                logger.error(`处理文件 ${file} 时出错: ${err.message}`);
            }
        }
    }, 100, {
        format: '{bar} {percentage}% | {value}/{total} | {text}'
    });

    logger.success('项目生成完成');
};

/**
 * 获取目录下的所有文件路径
 * @param {string} dir 目录路径
 * @returns {Promise<string[]>} 文件路径数组
 */
const getAllFiles = async (dir) => {
    let results = [];
    const list = await fs.readdir(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            const subResults = await getAllFiles(filePath);
            results = results.concat(subResults);
        } else {
            results.push(filePath);
        }
    }

    return results;
};

module.exports = {
    generate
}; 