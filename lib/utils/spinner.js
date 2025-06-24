/**
 * 命令行加载动画工具
 * @author my-cli
 */

const ora = require('ora');

/**
 * 创建加载动画实例
 * @param {string} text - 加载文本
 * @returns {object} ora实例
 */
function createSpinner(text) {
    return ora({
        text,
        color: 'cyan',
        spinner: 'dots'
    });
}

/**
 * 执行异步任务并显示加载动画
 * @param {string} text - 加载文本
 * @param {Function} task - 异步任务函数
 * @param {string} successText - 成功时显示的文本
 * @returns {Promise<any>} 任务执行结果
 */
async function executeTask(text, task, successText) {
    const spinner = createSpinner(text);
    spinner.start();

    try {
        const result = await task();
        spinner.succeed(successText || `${text}完成`);
        return result;
    } catch (error) {
        spinner.fail(`${text}失败`);
        throw error;
    }
}

module.exports = {
    createSpinner,
    executeTask,
    // 兼容create.js中的调用方式
    create: createSpinner
}; 