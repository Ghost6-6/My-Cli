/**
 * GitHub仓库下载工具
 * @author my-cli
 */

const download = require('download-git-repo');
const path = require('path');
const fs = require('fs-extra');
const { executeTask } = require('./spinner');
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
 * 从GitHub下载仓库
 * @param {string} repo - 仓库地址，格式：用户名/仓库名
 * @param {string} targetDir - 目标目录
 * @param {object} options - 选项
 * @param {string} options.branch - 分支名，默认为master
 * @param {boolean} options.clone - 是否使用git clone下载
 * @returns {Promise<void>}
 */
async function downloadFromGitHub(repo, targetDir, options = {}) {
    const { branch = 'master', clone = false } = options;

    // 调整仓库名称格式
    const repoUrl = `${repo}${branch ? '#' + branch : ''}`;

    // 确保目标目录存在
    await fs.ensureDir(targetDir);

    return new Promise((resolve, reject) => {
        download(repoUrl, targetDir, { clone }, (err) => {
            if (err) {
                reject(err);
                return;
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
        const welcome = new WelcomeMessage(`正在从GitHub下载模板 ${repo}`);
        welcome.start();

        try {
            await downloadFromGitHub(repo, targetDir, options);
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