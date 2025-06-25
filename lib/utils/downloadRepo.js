/**
 * GitHub仓库下载工具
 * @author my-cli
 */

const download = require('download-git-repo');
const path = require('path');
const fs = require('fs-extra');
const { executeTask, executeWithProgress } = require('./spinner');
const logger = require('./logger');
const WelcomeMessage = require('./welcome');

/**
 * 从GitHub下载仓库
 * @param {string} repo - 仓库地址，格式：用户名/仓库名
 * @param {string} targetDir - 目标目录
 * @param {string} branch - 分支名，默认为master
 * @returns {Promise<void>}
 */
function downloadRepo(repo, targetDir, branch = 'master') {
    // 调整仓库名称格式
    const repoUrl = `${repo}${branch ? '#' + branch : ''}`;

    // 确保目标目录存在
    fs.ensureDirSync(targetDir);

    return new Promise((resolve, reject) => {
        download(repoUrl, targetDir, { clone: false }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

/**
 * 模拟下载进度
 * @param {Function} updateProgress - 更新进度的回调函数
 * @param {number} duration - 预计下载时间(毫秒)
 * @returns {Promise<void>}
 */
function simulateDownloadProgress(updateProgress, duration = 3000) {
    return new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
            // 模拟非线性进度，开始慢，中间快，结束慢
            if (progress < 30) {
                progress += 1;
            } else if (progress < 70) {
                progress += 2;
            } else if (progress < 90) {
                progress += 1;
            } else if (progress < 98) {
                progress += 0.5;
            }

            if (progress >= 98) {
                clearInterval(interval);
                updateProgress(98, '即将完成下载');
                resolve();
            } else {
                updateProgress(Math.min(progress, 98), `正在下载仓库，已完成 ${Math.round(progress)}%`);
            }
        }, duration / 100);
    });
}

/**
 * 从GitHub下载仓库
 * @param {string} repo - 仓库地址，格式：用户名/仓库名
 * @param {string} targetDir - 目标目录
 * @param {object} options - 选项
 * @param {string} options.branch - 分支名，默认为master
 * @param {boolean} options.clone - 是否使用git clone下载
 * @param {Function} options.onProgress - 进度回调
 * @returns {Promise<void>}
 */
async function downloadFromGitHub(repo, targetDir, options = {}) {
    const { branch = 'master', clone = false, onProgress } = options;

    // 调整仓库名称格式
    const repoUrl = `${repo}${branch ? '#' + branch : ''}`;

    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    // 如果提供了进度回调，模拟进度
    if (typeof onProgress === 'function') {
        simulateDownloadProgress(onProgress);
    }

    return new Promise((resolve, reject) => {
        download(repoUrl, targetDir, { clone }, (err) => {
            if (err) {
                reject(err);
                return;
            }

            // 如果有进度回调，更新到100%
            if (typeof onProgress === 'function') {
                onProgress(100, '下载完成');
            }

            resolve();
        });
    });
}

/**
 * 从GitHub下载模板
 * @param {string} repo - 仓库地址，格式：用户名/仓库名
 * @param {string} targetDir - 目标目录
 * @param {object} options - 选项
 * @returns {Promise<boolean>} 是否成功
 */
async function downloadTemplate(repo, targetDir, options = {}) {
    try {
        // 创建欢迎消息实例
        const welcome = new WelcomeMessage(`正在从GitHub下载模板 ${repo}`, {
            dotStyle: 'pulse',
            useGradient: true
        });

        // 显示ASCII艺术标题
        await WelcomeMessage.showTitle('My-CLI', {
            gradient: true,
            gradientColors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
            font: 'ANSI Shadow'
        });

        welcome.start();

        try {
            // 使用进度条下载
            await executeWithProgress('下载模板', async (updateProgress) => {
                await downloadFromGitHub(repo, targetDir, {
                    ...options,
                    onProgress: updateProgress
                });
            }, 100, {
                format: '{bar} {percentage}% | {value}/{total} | {text}'
            });

            // 下载完成，更改状态
            welcome.succeed();
            setTimeout(() => {
                welcome.stop();
                logger.success(`模板下载完成！`);
            }, 1000);
            return true;
        } catch (error) {
            welcome.stop(false);
            logger.error(`下载模板失败: ${error.message}`);
            return false;
        }
    } catch (error) {
        logger.error(`下载模板失败: ${error.message}`);
        return false;
    }
}

module.exports = {
    downloadRepo,
    downloadFromGitHub,
    downloadTemplate
}; 