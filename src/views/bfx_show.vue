<template>
  <div id="app">
    <h1>用户信息</h1>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="user-info">
      <p><strong>用户名:</strong> {{ user.username }}</p>
      <p><strong>昵称:</strong> {{ user.nickname }}</p>
      <p><strong>真实姓名:</strong> {{ user.realname || '未设置' }}</p>
      <p><strong>邮箱:</strong> {{ user.email }}</p>
      <p><strong>头像哈希:</strong> {{ user.avatar }}</p>
      <p><strong>个人简介:</strong> {{ user.bio || '暂无' }}</p>
      <p><strong>经验值:</strong> {{ user.experience }} / {{ user.next_level_xp }}</p>
      <p><strong>当前等级经验:</strong> {{ user.current_level_xp }}</p>
      <p><strong>代币数量:</strong> {{ user.tokens }}</p>
      <p><strong>志愿者时间:</strong> {{ user.volunteerTime }} 小时</p>
      <p><strong>等级:</strong> {{ user.level }}</p>
      <p><strong>头衔:</strong> {{ user.title || '无' }}</p>
      <p><strong>角色:</strong> {{ user.role }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref({});
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('https://www.aidiventure.com/api/users/?identifier=724532');
    if (!response.ok) {
      throw new Error('网络响应不正常');
    }
    const data = await response.json();
    // 根据实际返回的数据结构调整
    user.value = data;
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
.user-info p {
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  max-width: 500px;
}
</style>
