<template>
  <div class="home">
    <h1>欢迎使用 {{projectName}}</h1>
    <p>这是一个由 my-cli 创建的 Vue 3 项目</p>
    
    <div class="features">
      <div class="feature">
        <h3>Vite</h3>
        <p>快速的开发构建工具</p>
      </div>
      
      <div class="feature">
        <h3>Vue Router</h3>
        <p>Vue的官方路由</p>
      </div>
      
      <div class="feature">
        <h3>Pinia</h3>
        <p>Vue 3的状态管理库</p>
      </div>
    </div>
    
    <div class="getting-started">
      <h2>开始使用</h2>
      <p>编辑 <code>src/views/HomeView.vue</code> 开始开发你的应用</p>
    </div>
  </div>
</template>

<style>
.home {
  padding: 20px;
}

.features {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
}

.feature {
  max-width: 300px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.feature h3 {
  color: #42b983;
}

.getting-started {
  margin-top: 40px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

code {
  background-color: #eee;
  padding: 2px 5px;
  border-radius: 3px;
}
</style> 