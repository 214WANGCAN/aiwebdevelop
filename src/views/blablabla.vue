<template>
  <div class="app">
    <!-- 主内容区域 -->
    <div class="content">
      <h1>当前数字: {{ num }}</h1>
      <div class="controls">
        <button @click="addOne">+</button>
        <button @click="subtractOne">-</button>
        <button @click="resetToZero">清零</button>
      </div>
    </div>

    <!-- 动画轨道和小球 -->
    <div class="orbit-container">
      <div class="orbit"></div>
      <div class="ball"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const num = ref(0);

function addOne() {
  num.value += 1;
}

function subtractOne() {
  num.value -= 1;
}

function resetToZero() {
  num.value = 0;
}
</script>

<style scoped>
/* 基础布局 */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: sans-serif;
  padding: 2rem;
}

.content {
  text-align: center;
}

.controls button {
  margin: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.controls button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* ================= 新增动画部分 ================= */
.orbit-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 2rem auto;
}

.orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc; /* 虚线轨道 */
  border-radius: 50%;
}

.ball {
  position: absolute;
  top: 0;
  left: calc(50% - 10px); /* 居中偏移 */
  width: 20px;
  height: 20px;
  background: radial-gradient(circle at center, #ff5e62, #ff9966);
  border-radius: 50%;
  animation: spinAround 3s linear infinite; /* 关键帧动画 */
}

@keyframes spinAround {
  from {
    transform: rotate(0deg) translateX(100px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(100px) rotate(-360deg);
  }
}
</style>
