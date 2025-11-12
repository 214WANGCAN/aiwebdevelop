<template>
  <div class="lottery-wrapper">
    <div class="machine-group">
      <!-- 三个独立的滚轴 -->
      <div
        v-for="(col, index) in columns"
        :key="index"
        class="reel-container"
        :class="{ spinning: isSpinning }"
      >
        <div class="reel">
          <ul :style="{ transform: `translateY(${col.offset}px)` }">
            <li v-for="(item, i) in reelItems[index]" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>

      <button @click="startSpinning" :disabled="isSpinning">开始抽奖</button>
    </div>

    <!-- 筛选器 -->
    <div class="filters">
      <div class="filter-group">
        <button class="filter-btn" @click="toggleRestaurantFilter">
          {{ restaurantFilter.label }}
          <span v-if="restaurantFilter.open" class="arrow">▼</span>
          <span v-else class="arrow">&#9654;</span>
        </button>
        <div v-if="restaurantFilter.open" class="filter-dropdown">
          <div 
            v-for="option in restaurantOptions" 
            :key="option.value"
            class="filter-option"
            :class="{ active: restaurantFilter.value === option.value }"
            @click="selectRestaurant(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>

      <div class="filter-group">
        <button class="filter-btn" @click="toggleDishTypeFilter">
          {{ dishTypeFilter.label }}
          <span v-if="dishTypeFilter.open" class="arrow">▼</span>
          <span v-else class="arrow">&#9654;</span>
        </button>
        <div v-if="dishTypeFilter.open" class="filter-dropdown">
          <div 
            v-for="option in dishTypeOptions" 
            :key="option.value"
            class="filter-option"
            :class="{ active: dishTypeFilter.value === option.value }"
            @click="selectDishType(option)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中奖弹窗 -->
    <div v-if="showWinnerModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h2>&#127881; 恭喜你抽中了！</h2>
        <p class="winner-dish">{{ winnerCombination }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from 'vue';

// 基础菜品数据（按餐厅和类型分类）
const dishesData = {
  '英高': {
    '主食': ['炸鱼薯条', '牧羊人派', '约克郡布丁'],
    '素食': ['烤蔬菜派', '豆类沙拉', '蔬菜卷']
  },
  '美高': {
    '主食': ['汉堡', '披萨', '牛排'],
    '素食': ['沙拉', '蔬菜三明治', '素汉堡']
  },
  '澳高': {
    '主食': ['烤肉', '肉馅派', '海鲜拼盘'],
    '素食': ['烤蔬菜', '藜麦沙拉', '蔬菜派']
  },
  '宿舍楼': {
    '主食': ['麻辣烫', 'mother', 'father'],
    '素食': ['烤蔬菜', '藜麦沙拉', '蔬菜派']
  }
};

// 工具函数：生成扩展列表（重复多次）
function generateExtendedList(sourceArray, repeatTimes = 5) {
  return Array(repeatTimes).fill().flatMap(() => sourceArray);
}

// 打乱数组函数（Fisher-Yates 洗牌算法）
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 筛选状态
const restaurantFilter = ref({
  label: '选择餐厅',
  value: '',
  open: false
});

const dishTypeFilter = ref({
  label: '选择类型',
  value: '',
  open: false
});

// 选项列表
const restaurantOptions = [
  { label: '英高', value: '英高' },
  { label: '美高', value: '美高' },
  { label: '澳高', value: '澳高' },
  { label: "宿舍楼", value: "宿舍楼"}
];

const dishTypeOptions = [
  { label: '主食', value: '主食' },
  { label: '素食', value: '素食' }
];

// 根据筛选条件获取菜品列表
function getFilteredDishes() {
  if (!restaurantFilter.value.value || !dishTypeFilter.value.value) {
    return [];
  }
  
  return dishesData[restaurantFilter.value.value][dishTypeFilter.value.value] || [];
}

// 为每个滚轮创建不同的内容列表（每个滚轮使用不同的顺序）
const reelItems = ref([[], [], []]);

const itemHeight = 100; // 每项高度
const visibleItems = 1; // 可见行数（决定中间是哪一行）

// 使用对象数组存储每个滚轮的独立偏移量
const columns = ref([
  { offset: 0 },
  { offset: 0 },
  { offset: 0 }
]);

const isSpinning = ref(false);
const winnerCombination = ref(null);
const showWinnerModal = ref(false); // 控制弹窗显隐

let animationFrameId = null;
let startTime = null;
const duration = 3000; // 动画总时长

// 监听筛选条件变化，更新菜品列表
watch([restaurantFilter, dishTypeFilter], () => {
  updateReelItems();
}, { deep: true });

// 初始化时设置默认值
restaurantFilter.value = { ...restaurantFilter.value, value: '英高', label: '英高' };
dishTypeFilter.value = { ...dishTypeFilter.value, value: '主食', label: '主食' };
updateReelItems();

function updateReelItems() {
  const filteredDishes = getFilteredDishes();
  if (filteredDishes.length === 0) return;
  
  // 为每个滚轮生成不同的顺序
  const shuffled1 = shuffleArray([...filteredDishes]);
  const shuffled2 = shuffleArray([...filteredDishes]);
  const shuffled3 = shuffleArray([...filteredDishes]);
  
  reelItems.value = [
    generateExtendedList(shuffled1),
    generateExtendedList(shuffled2),
    generateExtendedList(shuffled3)
  ];
}

// 获取随机中奖菜品
function getRandomDish() {
  const filteredDishes = getFilteredDishes();
  if (filteredDishes.length === 0) return '请先选择餐厅和类型';
  
  const randomIndex = Math.floor(Math.random() * filteredDishes.length);
  return filteredDishes[randomIndex];
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
  const targetRowIndex = 0; // 由于visibleItems=1，所以中间是第一个元素
  const scrollToIndex = pos - targetRowIndex;
  return scrollToIndex * -itemHeight; // Y轴负方向移动
}

function startSpinning() {
  if (isSpinning.value) return;

  const filteredDishes = getFilteredDishes();
  if (filteredDishes.length === 0) {
    alert('请先选择餐厅和菜品类型');
    return;
  }

  isSpinning.value = true;
  winnerCombination.value = null;
  showWinnerModal.value = false; // 确保关闭之前的弹窗
  startTime = performance.now();

  const selectedDish = getRandomDish();

  function updateAnimation(currentTimestamp) {
    if (!startTime) startTime = currentTimestamp;
    const elapsed = currentTimestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // easeOutCubic 缓动
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    for (let i = 0; i < 3; i++) {
      const targetOffset = calculateOffsetForReel(selectedDish, reelItems.value[i]);
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
    const finalOffset = calculateOffsetForReel(selectedDish, reelItems.value[i]);
    columns.value[i].offset = finalOffset;
  }

  winnerCombination.value = selectedDish;
  showWinnerModal.value = true; // 打开弹窗
}

function closeModal() {
  showWinnerModal.value = false;
}

// 监听 ESC 键关闭弹窗
function handleEscKey(event) {
  if (event.key === 'Escape' && showWinnerModal.value) {
    closeModal();
  }
}

window.addEventListener('keydown', handleEscKey);

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('keydown', handleEscKey);
});

// 筛选器交互逻辑
function toggleRestaurantFilter() {
  restaurantFilter.value.open = !restaurantFilter.value.open;
  if (restaurantFilter.value.open) {
    dishTypeFilter.value.open = false;
  }
}

function toggleDishTypeFilter() {
  dishTypeFilter.value.open = !dishTypeFilter.value.open;
  if (dishTypeFilter.value.open) {
    restaurantFilter.value.open = false;
  }
}

function selectRestaurant(option) {
  restaurantFilter.value.value = option.value;
  restaurantFilter.value.label = option.label;
  restaurantFilter.value.open = false;
}

function selectDishType(option) {
  dishTypeFilter.value.value = option.value;
  dishTypeFilter.value.label = option.label;
  dishTypeFilter.value.open = false;
}

// 点击外部关闭筛选器
document.addEventListener('click', (e) => {
  if (!e.target.closest('.filter-group')) {
    restaurantFilter.value.open = false;
    dishTypeFilter.value.open = false;
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 机器组横向排列并居中 */
.machine-group {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

/* 限制每列高度为1个项目（100px）*/
.reel-container {
  width: 200px;
  height: 100px;
  border: 3px solid #ffcc00;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease-in-out;
}

/* 抽奖时的呼吸效果 */
.reel-container.spinning {
  animation: breathe 0.8s infinite alternate;
}

@keyframes breathe {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

.reel {
  width: 100%;
  height: 100%;
}

.reel ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
  transition: all 0.3s;
  margin-left: 30px;
}

button:hover:not(:disabled) {
  background-color: #ff5252;
  transform: translateY(-2px);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 模态弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: slideUp 0.4s ease-out;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 32px;
  cursor: pointer;
  color: #aaa;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.winner-dish {
  font-size: 2rem;
  color: #4caf50;
  margin: 20px 0;
  font-weight: bold;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 筛选器样式 */
.filters {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.filter-group {
  position: relative;
}

.filter-btn {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.filter-btn:hover {
  background-color: #3a7bc8;
}

.arrow {
  font-size: 12px;
  transition: transform 0.3s;
}

.filter-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin-top: 5px;
  overflow: hidden;
}

.filter-option {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.filter-option:last-child {
  border-bottom: none;
}

.filter-option:hover {
  background-color: #f5f5f5;
}

.filter-option.active {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
}
</style>
