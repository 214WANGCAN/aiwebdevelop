<template>
  <div class="lottery-wrapper">
    <div class="machine-group">
      <!-- 三个独立的滚轴 -->
      <div v-for="(col, index) in columns" :key="index" class="reel">
        <ul :style="{ transform: `translateY(${col.offset}px)` }">
          <li v-for="(item, i) in reelItems[index]" :key="i">{{ item }}</li>
        </ul>
      </div>

      <button @click="startSpinning" :disabled="isSpinning">开始抽奖</button>
    </div>

    <div v-if="winnerCombination" class="result">
      &#127881; 恭喜你！你抽中了：{{ winnerCombination }}
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

// 基础菜品列表
const dishes = [
  '宫保鸡丁', '麻婆豆腐', '水煮鱼', '回锅肉',
  '辣子鸡', '酸菜鱼', '红烧肉', '糖醋排骨',
  '清蒸鲈鱼', '番茄炒蛋', '葱爆羊肉', '蒜蓉粉丝虾',
];

// 工具函数：生成扩展列表（重复多次）
function generateExtendedList(sourceArray, repeatTimes = 5) {
  return Array(repeatTimes).fill().flatMap(() => sourceArray);
}

// &#127775; 为每个滚轮创建不同的内容列表（你可以自由定制）
const reel1Items = generateExtendedList(shuffleArray(dishes));
const reel2Items = generateExtendedList(shuffleArray(dishes));
const reel3Items = generateExtendedList(shuffleArray(dishes)); // 随机打乱

const reelItems = [reel1Items, reel2Items, reel3Items];

const itemHeight = 100; // 每项高度
const visibleItems = 3; // 可见行数（决定中间是哪一行）

// &#128260; 使用对象数组存储每个滚轮的独立偏移量
const columns = ref([
  { offset: 0 },
  { offset: 0 },
  { offset: 0 }
]);

const isSpinning = ref(false);
const winnerCombination = ref(null);
let animationFrameId = null;
let startTime = null;
const duration = 3000; // 动画总时长

// 打乱数组函数（Fisher-Yates 洗牌算法）
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 获取随机中奖菜品
function getRandomDish() {
  const randomIndex = Math.floor(Math.random() * dishes.length);
  return dishes[randomIndex];
}

// 查找某个菜品在某个列表中的首次出现位置
function findItemPositionInReel(targetItem, reelData) {
  return reelData.indexOf(targetItem);
}

// 计算某个滚轮要让目标菜品出现在中间所需的偏移量
function calculateOffsetForReel(targetItem, reelData) {
  const pos = findItemPositionInReel(targetItem, reelData);
  if (pos === -1) throw new Error(`菜品 "${targetItem}" 未找到于当前列表`);

  // 我们要让这个菜出现在第2个位置（索引1），即中间那一行
  const targetRowIndex = 1; // 中间行索引
  const scrollToIndex = pos - targetRowIndex;
  return scrollToIndex * -itemHeight; // Y轴负方向移动
}

function startSpinning() {
  if (isSpinning.value) return;

  isSpinning.value = true;
  winnerCombination.value = null;
  startTime = performance.now();

  const selectedDish = getRandomDish();

  function updateAnimation(currentTimestamp) {
    if (!startTime) startTime = currentTimestamp;
    const elapsed = currentTimestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic 缓动
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    for (let i = 0; i < 3; i++) {
      const targetOffset = calculateOffsetForReel(selectedDish, reelItems[i]);
      columns.value[i].offset = targetOffset * easeProgress;
    }

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(updateAnimation);
    } else {
      finishSpinning(selectedDish);
    }
  }

  animationFrameId = requestAnimationFrame(updateAnimation);
}

function finishSpinning(selectedDish) {
  cancelAnimationFrame(animationFrameId);
  isSpinning.value = false;

  // 确保最终对齐到准确位置
  for (let i = 0; i < 3; i++) {
    const finalOffset = calculateOffsetForReel(selectedDish, reelItems[i]);
    columns.value[i].offset = finalOffset;
  }

  winnerCombination.value = selectedDish;
}

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
/* 全局居中布局 */
.lottery-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

/* 机器组横向排列并居中 */
.machine-group {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

/* 限制每列高度为3个项目（300px）*/
.reel {
  width: 200px;
  height: 300px;
  border: 3px solid #ffcc00;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.reel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.reel li {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  border-bottom: 1px dashed #eee;
}

button {
  padding: 14px 32px;
  font-size: 1.3rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 30px;
}

button:hover:not(:disabled) {
  background-color: #ff5252;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result {
  font-size: 1.8rem;
  color: #4caf50;
  font-weight: bold;
  animation: pulse 1s infinite alternate;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}
</style>