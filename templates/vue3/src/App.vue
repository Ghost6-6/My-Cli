<template>
  <div class="app">
    <header>
      <img src="./assets/logo.svg" alt="Vue logo" class="logo" />
      <h1>{{projectName}}</h1>
    </header>
    
    <div class="content">
      <nav>
        <router-link to="/">首页</router-link> |
        <router-link to="/about">关于</router-link>
      </nav>
      
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}

header {
  margin-bottom: 40px;
}

.logo {
  width: 100px;
  height: 100px;
}

nav {
  padding: 20px 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  margin-top: 40px;
}
</style> 