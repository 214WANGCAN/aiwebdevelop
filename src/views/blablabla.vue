<template>
  <div class="app">
    <!-- 控制区域 -->
    <div class="controls-panel">
      <h1>计数器: {{ num }}</h1>
      <div class="buttons">
        <button @click="addOne">+</button>
        <button @click="subtractOne">-</button>
        <button @click="resetToZero">归零</button>
      </div>
    </div>

    <!-- 动画展示区 -->
    <div class="animation-area">
      <div class="orbit">
        <div class="ball"></div>
      </div>
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
/* 整体布局 */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eee, #aaa);
  gap: 2rem; /* 元素间距 */
  padding: 2rem;
}

/* 控制面板样式 */
.controls-panel {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls-panel h1 {
  margin-bottom: 1rem;
  color: #333;
}

.buttons button {
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buttons button:hover {
  transform: scale(1.05);
  background-color: #6a11cb;
  color: white;
}

/* ================= 核心动画部分 ================= */
.animation-area {
  width: 300px;          /* 轨道直径 */
  height: 300px;         /* 轨道直径 */
  position: relative;
}

.orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(106, 17, 203, 0.5); /* 半透明紫色边框作为轨道参考线 */
  border-radius: 50%;     /* 变成正圆 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.ball {
  width: 30px;
  height: 30px;
  background: radial-gradient(circle at 30% 30%, #ff5e62, #ff9966);
  border-radius: 50%;
  position: absolute;
  animation: orbitRotation 4s linear infinite; /* 关键帧动画 */
}

@keyframes orbitRotation {
  from {
    transform: rotate(0deg) translateX(150px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(150px) rotate(-360deg);
  }
}
</style>
