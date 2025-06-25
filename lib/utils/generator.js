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
        await fs.copy(src, dest);
        updateProgress(50, '文件复制完成');

        // 获取目标目录中的所有文件
        const files = await getAllFiles(dest);
        logger.info(`找到 ${files.length} 个文件需要处理`);

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
            } catch (err) {
                logger.error(`处理文件 ${file} 时出错: ${err.message}`);
            }
        }
    }, 100);

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