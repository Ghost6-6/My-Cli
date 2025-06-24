import React from 'react';

function Home() {
    return (
        <div className="home-page">
            <h1>欢迎使用 {{ projectName }}</h1>
            <p>这是一个由 my-cli 创建的 React 项目</p>

            <div className="features">
                <div className="feature">
                    <h3>React</h3>
                    <p>用于构建用户界面的JavaScript库</p>
                </div>

                <div className="feature">
                    <h3>React Router</h3>
                    <p>React的声明式路由</p>
                </div>

                <div className="feature">
                    <h3>Create React App</h3>
                    <p>零配置的React应用脚手架</p>
                </div>
            </div>

            <div className="getting-started">
                <h2>开始使用</h2>
                <p>编辑 <code>src/App.js</code> 开始开发你的应用</p>
            </div>
        </div>
    );
}

export default Home; 