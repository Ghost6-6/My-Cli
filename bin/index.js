#!/usr/bin/env node

/**
 * CLI入口文件
 * @author my-cli
 */

const { program } = require('commander');
const pkg = require('../package.json');
const create = require('../lib/create');
const logger = require('../lib/utils/logger');

// 设置版本信息
program.version(pkg.version, '-v, --version', '显示版本号');
program.name('my-cli').usage('<命令> [选项]');

// 创建项目命令
program
    .command('create <project-name>')
    .description('创建一个新项目')
    .option('-t, --template <template>', '指定项目模板')
    .option('-f, --force', '强制覆盖已存在的目录')
    .option('-y, --yes', '使用默认配置，跳过问询')
    .option('-r, --repo <repository>', '从GitHub仓库拉取模板 (格式: 用户名/仓库名)')
    .option('-b, --branch <branch>', '指定GitHub仓库的分支', 'master')
    .action((projectName, options) => {
        create(projectName, options);
    });

// 添加命令示例
program.on('--help', () => {
    console.log('');
    console.log('示例:');
    console.log('  $ my-cli create my-project');
    console.log('  $ my-cli create my-project --template basic');
    console.log('  $ my-cli create my-project --force');
    console.log('  $ my-cli create my-project --repo owner/repo-name');
    console.log('  $ my-cli create my-project --repo owner/repo-name --branch develop');
});

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何参数，则显示帮助信息
if (!process.argv.slice(2).length) {
    program.outputHelp();
}

// 处理未知命令
program.on('command:*', ([cmd]) => {
    logger.error(`未知命令 ${logger.highlight(cmd)}`);
    const availableCommands = program.commands.map(cmd => cmd.name());
    if (availableCommands.length) {
        logger.info(`可用命令: ${availableCommands.join(', ')}`);
    }
    process.exit(1);
}); 