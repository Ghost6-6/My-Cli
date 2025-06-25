/**
 * 命令行加载动画工具
 * @author my-cli
 */

const ora = require('ora');
const chalk = require('chalk');
const cliProgress = require('cli-progress');

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

/**
 * 创建进度条
 * @param {string} format - 进度条格式
 * @param {object} options - 进度条选项
 * @returns {object} 进度条实例
 */
function createProgressBar(format, options = {}) {
    const defaultFormat = `${chalk.cyan('{bar}')} {percentage}% | {value}/{total} | {text}`;

    return new cliProgress.SingleBar({
        format: format || defaultFormat,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,
        clearOnComplete: false,
        stopOnComplete: true,
        ...options
    });
}

/**
 * 执行带进度条的异步任务
 * @param {string} text - 任务描述
 * @param {Function} task - 接收更新进度函数的异步任务
 * @param {number} total - 总进度值
 * @param {object} options - 进度条选项
 * @returns {Promise<any>} 任务执行结果
 */
async function executeWithProgress(text, task, total = 100, options = {}) {
    const progressBar = createProgressBar(options.format, options);
    progressBar.start(total, 0, { text });

    try {
        const result = await task((value, updateText) => {
            progressBar.update(value, { text: updateText || text });
        });
        progressBar.update(total, { text: `${text}完成` });
        progressBar.stop();
        return result;
    } catch (error) {
        progressBar.stop();
        console.error(chalk.red(`✖ ${text}失败: ${error.message}`));
        throw error;
    }
}

module.exports = {
    createSpinner,
    executeTask,
    createProgressBar,
    executeWithProgress,
    // 兼容create.js中的调用方式
    create: createSpinner
}; 