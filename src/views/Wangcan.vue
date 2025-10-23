<template>
  <div class="app">
    <header>
      <h1>🏰 冒险者任务看板</h1>
      <p>欢迎来到冒险者公会，选择一个任务开始你的旅程吧！</p>
    </header>

    <main>
      <div class="task-list">
        <div v-for="task in tasks" :key="task.id" class="task-card">
          <h2>{{ task.title }}</h2>
          <p>{{ task.description }}</p>
          <p><strong>奖励：</strong>{{ task.reward }} 金币</p>
          <button @click="accept(task)">接受任务</button>
        </div>
      </div>
    </main>

    <footer>
      <p>⚔️ 冒险者工会 © 2025</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: '打扫图书馆', description: '清理图书馆的灰尘与书架。', reward: 20 },
  { id: 2, title: '护送商队', description: '保护商队安全通过森林。', reward: 100 },
  { id: 3, title: '讨伐史莱姆', description: '清除村外的史莱姆群。', reward: 50 },
])

function accept(task) {
  alert(`你接受了任务：「${task.title}」！`)
}
</script>

<style scoped>
/* 让整个页面铺满窗口 */
html, body, #app, .app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 设置背景、布局 */
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #b8e1ff, #f8f9fa);
  color: #333;
  font-family: "Segoe UI", "PingFang SC", sans-serif;
  overflow-x: hidden;
}

/* 顶部 */
header {
  margin-top: 2rem;
  text-align: center;
}

/* 任务区：自动换行 + 居中 */
main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem;
}

/* 卡片 */
.task-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  width: 240px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

/* 按钮 */
button {
  margin-top: 1rem;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #45a049;
}

/* 底部 */
footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #666;
}
</style>
