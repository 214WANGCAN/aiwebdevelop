<template>
  <div id="app">
    <h1>用户信息</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://www.aidiventure.com/api/users/?identifier=724532');
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    const data = await response.json();
    users.value = data; // 根据实际返回的数据结构调整
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
}
</style>
