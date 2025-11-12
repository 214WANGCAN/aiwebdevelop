<template>
  <div id="app">
    <h1 style="text-align: center; margin-top: 30px; color: #ff6b6b;">&#127860; 今日幸运菜大转盘 &#127860;</h1>
    <LotteryMachine />
  </div>

  <div class="lottery-container">
    <!-- 显示屏 -->
    <div class="display-box">
      <transition name="flip" mode="out-in">
        <h2 :key="currentText">{{ currentText }}</h2>
      </transition>
    </div>

    <!-- 控制按钮 -->
    <button @click="startLottery" :disabled="isRunning">
      {{ isRunning ? '抽奖中...' : '开始抽奖' }}
    </button>

    <!-- 提示信息 -->
    <p v-if="result !== null" class="result-message">&#127881; 你抽到了：{{ result }}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
  }
#app {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
</style>

<script setup>
import { ref } from 'vue';

const dishes = [
  '宫保鸡丁', '麻婆豆腐', '水煮鱼', '回锅肉',
  '辣子鸡', '酸菜鱼', '红烧肉', '糖醋排骨',
  '清蒸鲈鱼', '番茄炒蛋', '葱爆羊肉', '蒜蓉粉丝虾'
]; 
// -------------------|---------------------------------
// -------------------|---------------------------------可自定义更多菜品

const currentText = ref('请点击开始');
const isRunning = ref(false);
const result = ref(null);
let timerId = null;

function startLottery() {
  if (isRunning.value) return; // 如果已经在运行，则忽略点击

  isRunning.value = true;
  result.value = null;

  let counter = 0;
  const speed = 100; // 每100毫秒换一次文字

  timerId = setInterval(() => {
    // 从数组中随机选取一个作为临时展示内容
    const randomIndex = Math.floor(Math.random() * dishes.length);
    currentText.value = dishes[randomIndex];
    counter++;

    // 大约3秒后停止（约30次变化）
    if (counter > 30) {
      clearInterval(timerId);
      finishLottery();
      currentText.value = result
    }
  }, speed);
}

function finishLottery() {
  const finalIndex = Math.floor(Math.random() * dishes.length);
  result.value = dishes[finalIndex];
  isRunning.value = false;
}
</script>

<style scoped>
.lottery-container {
  border: 3px solid #ffa500;
  border-radius: 15px;
  padding: 30px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.display-box {
  height: 80px;
  line-height: 80%;
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fffbe6, #ffecb3);
  border-radius: 8px;
  overflow: hidden;
}

button {
  padding: 12px 30px;
  font-size: 1.2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.result-message {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #27ae60;
  animation: pulse 1s infinite alternate;
}

/* 翻页动画 */
.flip-enter-active,
.flip-leave-active {
  transition: transform 0.2s ease-in-out;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateX(90deg);
  opacity: 0;
}

.flip-enter-to,
.flip-leave-from {
  transform: rotateX(0deg);
  opacity: 1;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
</style>