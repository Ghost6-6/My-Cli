import React from 'react';

function About() {
    return (
        <div className="about-page">
            <h1>关于</h1>
            <div className="about-content">
                <p>这是 {{ projectName }} 的关于页面</p>
                <p>版本: {{ version }}</p>
                <p>{{ description }}</p>

                <div className="author">
                    <h3>作者</h3>
                    <p>{{ author }}</p>
                </div>
            </div>
        </div>
    );
}

export default About; 