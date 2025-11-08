<template>
  <div class="restaurant-rating-app">
    <!-- 侧边栏菜单 -->
    <div class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="sidebar-header">
        <h2 class="sidebar-title">菜单</h2>
        <button class="close-btn" @click="closeSidebar">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="sidebar-menu">
        <li>
          <a href="#" @click.prevent="navigateTo('random')">
            <i class="fas fa-random"></i>
            随机菜品推荐
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="navigateTo('ranking')">
            <i class="fas fa-trophy"></i>
            餐厅排行榜
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="navigateTo('hall')">
            <i class="fas fa-crown"></i>
            菜品名人堂
          </a>
        </li>
      </ul>
    </div>
    
    <!-- 遮罩层 -->
    <div class="overlay" :class="{ active: isSidebarOpen }" @click="closeSidebar"></div>
    
    <div class="container">
      <header>
        <button class="menu-btn" @click="openSidebar">
          <i class="fas fa-bars"></i>
        </button>
        <div class="logo">
          <i class="fas fa-utensils logo-icon"></i>
          <h1>校园餐厅评价系统</h1>
        </div>
        <button class="rate-btn" @click="goToRating">
          <i class="fas fa-star"></i>
          去评分
        </button>
      </header>
      
      <main class="main-content">
        <h2 class="section-title">今日热门菜品</h2>
        
        <div class="dishes-list">
          <div 
            class="dish-card" 
            v-for="(dish, index) in dishes" 
            :key="dish.id"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="rank-section">
              <div class="rank-badge" :class="getRankClass(index)">
                {{ getRankBadge(index) }}
              </div>
              <div class="rank-tag" :class="getTagClass(index)">
                {{ getRatingTag(index) }}
              </div>
            </div>
            
            <div class="dish-content">
              <img :src="dish.image" :alt="dish.name" class="dish-image">
              <div class="dish-info">
                <h3 class="dish-name">{{ dish.name }}</h3>
                <p class="dish-description">{{ dish.description }}</p>
                <div class="dish-rating">
                  <div class="rating-stars">
                    <i 
                      class="fas fa-star" 
                      v-for="n in 5" 
                      :key="n" 
                      :class="{ 'active-star': n <= dish.rating }"
                    ></i>
                  </div>
                  <span class="rating-value">{{ dish.rating.toFixed(1) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="reference-note">
          <p>仅供参考</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantMain',
  data() {
    return {
      isSidebarOpen: false,
      dishes: [
        {
          id: 1,
          name: '红烧肉',
          description: '经典家常菜，肥瘦相间，色泽红亮，入口即化',
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 4.7
        },
        {
          id: 2,
          name: '宫保鸡丁',
          description: '川菜代表，鸡肉鲜嫩，花生香脆，酸甜微辣',
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 4.5
        },
        {
          id: 3,
          name: '麻婆豆腐',
          description: '麻辣鲜香，豆腐嫩滑，下饭绝配',
          image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 4.6
        },
        {
          id: 4,
          name: '西红柿鸡蛋',
          description: '家常美味，酸甜可口，营养丰富',
          image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 4.3
        },
        {
          id: 5,
          name: '鱼香肉丝',
          description: '鱼香味浓郁，肉丝滑嫩，配菜丰富',
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          rating: 4.4
        }
      ]
    }
  },
  methods: {
    openSidebar() {
      this.isSidebarOpen = true;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    navigateTo(page) {
      const pageNames = {
        'random': '随机菜品页面',
        'ranking': '餐厅排行榜页面',
        'hall': '菜品名人堂界面'
      };
      alert(`即将跳转到${pageNames[page]}`);
      this.closeSidebar();
    },
    goToRating() {
      alert('即将跳转到评分页面');
    },
    getRankClass(index) {
      const classes = ['rank-1', 'rank-2', 'rank-3', 'rank-4', 'rank-5'];
      return classes[index] || '';
    },
    getRankBadge(index) {
      const badges = ['🥇', '🥈', '🥉', '4', '5'];
      return badges[index] || (index + 1);
    },
    getRatingTag(index) {
      const tags = ['夯', '顶级', '人上人', 'NPC', '拉'];
      return tags[index] || '普通';
    },
    getTagClass(index) {
      const classes = ['tag-best', 'tag-top', 'tag-high', 'tag-normal', 'tag-bad'];
      return classes[index] || 'tag-normal';
    }
  }
}
</script>

<style scoped>
.restaurant-rating-app {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 30px;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-left: 10px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}

.logo-icon {
  font-size: 32px;
  color: #3498db;
}

.menu-btn {
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  z-index: 10;
}

.menu-btn:hover {
  background: #2980b9;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 7px 20px rgba(52, 152, 219, 0.4);
}

.rate-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
}

.rate-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(231, 76, 60, 0.4);
}

.rate-btn i {
  margin-right: 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
  height: 80vh;
}

.section-title {
  font-size: 26px;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 3px solid #3498db;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.dishes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
}

.dish-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  display: flex;
  padding: 0;
  flex: 1;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dish-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.rank-section {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

.rank-badge {
  font-size: 28px;
  margin-bottom: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.rank-tag {
  font-size: 20px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 20px;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* 排名标签颜色 - 参考图片风格 */
.tag-best {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}

.tag-top {
  background: linear-gradient(45deg, #f39c12, #e67e22);
  color: white;
}

.tag-high {
  background: linear-gradient(45deg, #f1c40f, #f39c12);
  color: #2c3e50;
}

.tag-normal {
  background: linear-gradient(45deg, #f9e79f, #f7dc6f);
  color: #2c3e50;
}

.tag-bad {
  background: linear-gradient(45deg, #ecf0f1, #bdc3c7);
  color: #7f8c8d;
}

.dish-content {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20px;
  border-left: 1px solid #eee;
}

.dish-image {
  width: 140px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 25px;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.dish-card:hover .dish-image {
  transform: scale(1.05);
}

.dish-info {
  flex: 1;
}

.dish-name {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.dish-description {
  color: #7f8c8d;
  font-size: 15px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.dish-rating {
  display: flex;
  align-items: center;
}

.rating-stars {
  color: #ddd;
  margin-right: 15px;
  font-size: 18px;
}

.rating-stars .active-star {
  color: #f39c12;
  text-shadow: 0 0 5px rgba(243, 156, 18, 0.5);
}

.rating-value {
  font-weight: 700;
  color: #2c3e50;
  font-size: 18px;
}

.reference-note {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  color: #7f8c8d;
  font-style: italic;
  border-top: 1px solid #eee;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -320px;
  width: 300px;
  height: 100vh;
  background: linear-gradient(180deg, #2c3e50 0%, #3498db 100%);
  box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  z-index: 1000;
  padding: 30px 20px;
  overflow-y: auto;
}

.sidebar.active {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.sidebar-title {
  font-size: 24px;
  color: white;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close-btn:hover {
  transform: rotate(90deg);
}

.sidebar-menu {
  list-style: none;
}

.sidebar-menu li {
  margin-bottom: 15px;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-size: 17px;
  background: rgba(255,255,255,0.1);
}

.sidebar-menu a:hover {
  background: rgba(255,255,255,0.2);
  transform: translateX(10px);
}

.sidebar-menu i {
  margin-right: 15px;
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .dish-card {
    flex-direction: column;
  }
  
  .rank-section {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .dish-content {
    border-left: none;
    padding: 15px;
  }
  
  .dish-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .sidebar {
    width: 280px;
  }
  
  header {
    flex-wrap: wrap;
  }
  
  .logo {
    position: static;
    transform: none;
    order: 2;
    width: 100%;
    justify-content: center;
    margin: 10px 0;
  }
  
  .menu-btn {
    order: 1;
  }
  
  .rate-btn {
    order: 3;
  }
}

/* 添加一些动画效果 */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.rank-1 .rank-badge {
  animation: pulse 2s infinite;
}

.rank-2 .rank-badge, .rank-3 .rank-badge {
  animation: pulse 3s infinite;
}

/* 夯标签特殊效果 */
.tag-best {
  position: relative;
  overflow: hidden;
}

.tag-best::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.8) 50%,
    rgba(255,255,255,0) 100%
  );
  transform: rotate(30deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(30deg); }
  100% { transform: translateX(-100%) translateY(-100%) rotate(30deg); }
}
</style>