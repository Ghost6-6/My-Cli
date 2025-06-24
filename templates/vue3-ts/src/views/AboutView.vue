<template>
  <div class="about">
    <h1>关于</h1>
    <div class="about-content">
      <p>这是 {{projectName}} 的关于页面</p>
      <p>版本: {{version}}</p>
      <p>{{description}}</p>
      
      <div class="author">
        <h3>作者</h3>
        <p>{{author}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView'
})
</script>

<style>
.about {
  padding: 20px;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.author {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}
</style> 