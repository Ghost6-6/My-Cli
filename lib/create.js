/**
 * 项目创建模块
 * @author my-cli
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const { generator, downloadTemplate, logger, spinner, executeWithProgress } = require('./utils/index');
const WelcomeMessage = require('./utils/welcome');

/**
 * 创建新项目
 * @param {string} projectName - 项目名称
 * @param {object} options - 命令行选项
 */
async function create(projectName, options) {
    // 目标目录路径
    const cwd = process.cwd();
    const targetDir = path.join(cwd, projectName);

    // 检查目标目录是否已存在
    if (fs.existsSync(targetDir)) {
        if (options.force) {
            // 强制删除已存在的目录
            await fs.remove(targetDir);
            logger.success(`已删除目录: ${targetDir}`);
        } else {
            // 询问用户是否覆盖
            const { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: `目标目录 ${projectName} 已存在，请选择操作:`,
                    choices: [
                        { name: '覆盖', value: 'overwrite' },
                        { name: '取消', value: 'cancel' }
                    ]
                }
            ]);

            if (action === 'cancel') {
                logger.info('已取消创建项目');
                return;
            } else if (action === 'overwrite') {
                logger.info(`删除目录 ${targetDir}...`);
                await fs.remove(targetDir);
                logger.success(`已删除目录: ${targetDir}`);
            }
        }
    }

    // 如果未指定--yes选项，且未指定模板，则询问用户选择模板
    let templateName = options.template;
    if (!options.yes || !templateName) {
        // 询问用户选择模板
        if (!templateName) {
            const { template } = await inquirer.prompt([
                {
                    name: 'template',
                    type: 'list',
                    message: '请选择项目模板:',
                    choices: [
                        { name: '基础模板', value: 'basic' },
                        { name: 'Vue 3', value: 'vue3' },
                        { name: 'Vue 3 + TypeScript', value: 'vue3-ts' },
                        { name: 'React', value: 'react' },
                        { name: 'React + TypeScript', value: 'react-ts' }
                    ]
                }
            ]);
            templateName = template;
        }
    } else {
        // 使用默认模板
        templateName = templateName || 'basic';
    }

    // 是否从远程仓库获取模板
    if (options.repo) {
        const branch = options.branch || 'main';
        const success = await downloadTemplate(options.repo, targetDir, { branch });

        if (success) {
            return;
        } else {
            return;
        }
    }

    // 获取项目元数据
    const metadata = {
        projectName,
        version: '0.1.0',
        description: `A ${templateName} project`,
        author: ''
    };

    // 如果未指定--yes选项，询问用户填写项目信息
    if (!options.yes) {
        const answers = await inquirer.prompt([
            {
                name: 'version',
                type: 'input',
                message: '项目版本:',
                default: metadata.version
            },
            {
                name: 'description',
                type: 'input',
                message: '项目描述:',
                default: metadata.description
            },
            {
                name: 'author',
                type: 'input',
                message: '作者:',
                default: metadata.author
            }
        ]);

        Object.assign(metadata, answers);
    }

    // 创建欢迎消息实例
    const welcome = new WelcomeMessage(`正在生成项目 ${projectName}`, {
        dotStyle: 'pulse',
        useGradient: true
    });
    welcome.start();

    try {
        const templateDir = path.resolve(__dirname, `../templates/${templateName}`);

        if (!fs.existsSync(templateDir)) {
            welcome.stop(false);
            logger.error(`模板 "${templateName}" 不存在`);
            return;
        }

        await generator.generate(templateDir, targetDir, metadata);

        // 下载完成，更改状态
        welcome.succeed();
        setTimeout(() => {
            welcome.stop();
            logger.success(`项目生成完成！`);

            // 显示后续步骤提示
            logger.info('\n后续步骤:');
            logger.info(`1. cd ${projectName}`);

            if (templateName === 'vue3' || templateName === 'vue3-ts' || templateName === 'react' || templateName === 'react-ts') {
                logger.info('2. npm install');
                logger.info('3. npm run dev 或 npm start');
            } else {
                logger.info('2. npm install');
                logger.info('3. 开始编码!');
            }
        }, 1000);
    } catch (error) {
        welcome.stop(false);
        logger.error(`项目创建失败: ${error.message}`);
    }
}

module.exports = create; 