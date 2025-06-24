# {{projectName}}

{{description}}

## 可用脚本

在项目目录中，你可以运行:

### `npm start`

在开发模式下运行应用。\
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

当你进行更改时，页面将重新加载。\
你也可能在控制台中看到任何 lint 错误。

### `npm run build`

将应用程序构建到 `build` 文件夹。\
它在生产模式下正确地打包 React，并优化构建以获得最佳性能。

构建被压缩，文件名包含哈希值。\
你的应用已准备好部署！

## 项目结构

```
{{projectName}}/
├── public/          # 静态资源目录
│   ├── index.html   # HTML模板
│   └── logo.svg     # Logo
├── src/             # 源代码目录
│   ├── components/  # 组件
│   ├── pages/       # 页面组件
│   │   ├── Home.js  # 首页
│   │   └── About.js # 关于页面
│   ├── styles/      # 样式文件
│   ├── App.js       # 主应用组件
│   └── index.js     # JavaScript入口点
└── package.json     # 项目配置
```

## 了解更多

你可以在 [Create React App 文档](https://facebook.github.io/create-react-app/docs/getting-started) 中了解更多信息。
