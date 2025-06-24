/**
 * 命令行日志工具
 * @author my-cli
 */

const chalk = require('chalk');

/**
 * 日志级别颜色配置
 */
const colorMap = {
    info: chalk.blue,
    success: chalk.green,
    warning: chalk.yellow,
    error: chalk.red
};

/**
 * 输出日志信息
 * @param {string} message - 日志信息
 * @param {string} type - 日志类型：info, success, warning, error
 */
function log(message, type = 'info') {
    const colorFn = colorMap[type] || chalk.white;
    console.log(colorFn(`[${type.toUpperCase()}] ${message}`));
}

/**
 * 输出普通信息
 * @param {string} message - 日志信息
 */
function info(message) {
    log(message, 'info');
}

/**
 * 输出成功信息
 * @param {string} message - 日志信息
 */
function success(message) {
    log(message, 'success');
}

/**
 * 输出警告信息
 * @param {string} message - 日志信息
 */
function warning(message) {
    log(message, 'warning');
}

/**
 * 输出错误信息
 * @param {string} message - 日志信息
 */
function error(message) {
    log(message, 'error');
}

/**
 * 输出强调文本
 * @param {string} message - 日志信息
 * @returns {string} 加粗的彩色文本
 */
function highlight(message) {
    return chalk.cyan.bold(message);
}

module.exports = {
    info,
    success,
    warning,
    error,
    highlight
}; 