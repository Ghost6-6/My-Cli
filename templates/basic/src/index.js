/**
 * {{projectName}} 项目入口文件
 * @author {{author}}
 */

const express = require('express');
const app = express();
const port = 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
    res.send(`
    <h1>{{projectName}}</h1>
    <p>{{description}}</p>
    <p>欢迎使用 my-cli 创建的项目！</p>
  `);
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动，访问地址: http://localhost:${port}`);
}); 