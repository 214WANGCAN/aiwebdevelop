<template>
  <div class="lottery-wrapper"> <!-- 新增外层包裹器用于全局居中 -->
    <div class="machine-group">   <!-- 新增组容器包裹滚轴+按钮 -->
      <!-- 三个独立的滚轴 -->
      <div v-for="(col, index) in columns" :key="index" class="reel">
        <ul :style="{ transform: `translateY(${col.offset}px)` }">
          <li v-for="(item, i) in extendedItems" :key="i">{{ item }}</li>
        </ul>
      </div>

      <button @click="startSpinning" :disabled="isSpinning">开始抽奖</button>
    </div>

    <div v-if="winnerCombination" class="result">
      &#127881; 恭喜你！你抽中了：{{ winnerCombination }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const dishes = [
  '宫保鸡丁', '麻婆豆腐', '水煮鱼', '回锅肉',
  '辣子鸡', '酸菜鱼', '红烧肉', '糖醋排骨',
  '清蒸鲈鱼', '番茄炒蛋', '葱爆羊肉', '蒜蓉粉丝虾'
]; // 共12种菜品

// &#9989; 修改1️⃣：生成足够长的重复列表供滚动使用
const extendedItems = Array(10).fill(undefined).flatMap(() => [...dishes]);
const itemHeight = 100; // 每个菜单项的高度（与CSS一致）

const columns = ref([
  { offset: 0 },
  { offset: 0 },
  { offset: 0 }
]);
const isSpinning = ref(false);
const winnerCombination = ref<string | null>(null);
let animationFrameId: number | null = null;
let startTime: number | null = null;
const duration = 3000; // 总动画时长（毫秒）

function startSpinning() {
  if (isSpinning.value) return;

  isSpinning.value = true;
  winnerCombination.value = null;
  startTime = performance.now();

  // &#9989; 修改2️⃣：为每个滚轴设置随机目标偏移量（必须是itemHeight的整数倍）
  const targets = columns.value.map(() => {
    const randomMultiple = Math.floor(Math.random() * 7); // 确保能覆盖到中间项
    return -randomMultiple * itemHeight;
  });

  function updateAnimation(currentTimestamp: number) {
    if (!startTime) startTime = currentTimestamp;
    const elapsed = currentTimestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0~1之间的进度值

    // 使用缓动函数（easeOutCubic）让运动先快后慢
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    ;
    for (let i = 0; i < 3; i++) {
      const targetOffset = targets[i];
      // 当前应到达的位置 = 起始点 + (终点−起点)×进度百分比
      columns.value[i].offset = targetOffset * easeProgress;
    }

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(updateAnimation);
    } else {
      finishSpinning();
    }
  }

  animationFrameId = requestAnimationFrame(updateAnimation);
}

function finishSpinning() {
  cancelAnimationFrame(animationFrameId!);
  isSpinning.value = false;

  // &#9989; 修改3️⃣：只取第一个滚轴的中间项作为唯一结果
  const middleIndex = Math.round(columns.value[0].offset / itemHeight) % dishes.length;
  winnerCombination.value = dishes[middleIndex];
}
</script>

<style scoped>
/* &#9989; 修改4️⃣：全局居中布局 */
.lottery-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

/* &#9989; 修改5️⃣：机器组横向排列并居中 */
.machine-group {
  display: flex;
  align-items: center;
  gap: 20px; /* 元素间距 */
  margin-bottom: 40px; /* 与结果区域的间距 */
}

/* &#9989; 修改6️⃣：限制每列高度为3个项目（150px）*/
.reel {
  width: 200px;
  height: 300px; /* &#9888;️ 关键！只显示3个菜品 */
  border: 2px solid #ffcc00;
  border-radius: 10px;
  background: white;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.reel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease-out;
}

.reel li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px dashed #eee;
}

button {
  padding: 12px 30px;
  font-size: 1.2rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #ff5252;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result {
  font-size: 1.5rem;
  color: #4caf50;
  font-weight: bold;
  animation: pulse 1s infinite alternate;
  text-align: center;
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
</style>
