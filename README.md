# @ghost_x/frontend-cli 前端项目脚手架工具

一个用于快速创建前端项目的命令行工具，类似于 create-react-app。

## 功能特点

- 支持多种项目模板：
  - 基础项目 (basic)
  - Vue 3
  - Vue 3 + TypeScript
  - React
  - React + TypeScript
- 交互式命令行界面，轻松配置项目
- 可以从本地模板或 GitHub 仓库创建项目
- 友好的命令行体验，带有彩色输出和加载动画

## 安装

全局安装：

```bash
npm install -g @ghost_x/frontend-cli
```

## 使用方法

### 创建新项目

```bash
ghost-cli create <项目名称>
```

然后按照交互式提示选择项目模板、版本、描述等信息。

### 命令行选项

- `-t, --template <模板>`: 指定项目模板，可选值: basic, vue3, vue3-ts, react, react-ts
- `-f, --force`: 强制覆盖已存在的目录
- `-y, --yes`: 使用默认配置，跳过问询
- `-r, --repo <仓库>`: 从 GitHub 仓库拉取模板 (格式: 用户名/仓库名)
- `-b, --branch <分支>`: 指定 GitHub 仓库的分支 (默认: master)

### 示例

创建基本项目:

```bash
ghost-cli create my-project
```

创建 React 项目:

```bash
ghost-cli create my-project --template react
```

创建 Vue 3 + TypeScript 项目:

```bash
ghost-cli create my-project --template vue3-ts
```

强制覆盖已存在目录:

```bash
ghost-cli create my-project --force
```

从 GitHub 仓库拉取模板:

```bash
ghost-cli create my-project --repo username/repo-name
```

指定 GitHub 仓库分支:

```bash
ghost-cli create my-project --repo username/repo-name --branch develop
```

## 安装问题解决

如果安装过程中遇到以下错误：

```
npm error code EEXIST
npm error EEXIST: file already exists
```

请尝试以下解决方案：

### 方案一：卸载后重新安装

```bash
# 先卸载已安装的包
npm uninstall -g @ghost_x/frontend-cli

# 然后重新安装
npm install -g @ghost_x/frontend-cli
```

### 方案二：使用 --force 参数强制安装

```bash
npm install -g @ghost_x/frontend-cli --force
```

### 方案三：使用 yarn 安装

```bash
yarn global add @ghost_x/frontend-cli
```

## 安装后使用

安装成功后，可以使用 `ghost-cli` 命令创建项目：

```bash
ghost-cli create my-project
```

如果需要验证安装是否成功，可以运行：

```bash
ghost-cli --version
```

## 许可证

ISC
