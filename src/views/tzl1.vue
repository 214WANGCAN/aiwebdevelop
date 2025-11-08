<template>
  <div id="app" class="container">
    <div class="header-section">
      <h1><i class="fas fa-user-circle me-2"></i>用户信息查询系统</h1>
      <p>通过API接口获取并展示用户详细信息</p>
    </div>

    <div class="input-section">
      <div class="row align-items-end">
        <div class="col-md-9">
          <label for="api-url" class="form-label">API地址</label>
          <input 
            type="text" 
            class="form-control" 
            id="api-url"
            placeholder="请输入API URL，例如：https://www.aidiventure.com/api/users/?identifier=724532" 
            v-model="apiUrl"
          >
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary w-100" @click="fetchUserData" :disabled="loading">
            <i class="fas fa-search me-2"></i>{{ loading ? '查询中...' : '查询用户信息' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-section">
      <div class="spinner"></div>
      <p>正在获取用户信息，请稍候...</p>
    </div>

    <!-- 错误信息 -->
    <div v-if="error" class="error-section">
      <i class="fas fa-exclamation-triangle me-2"></i>{{ error }}
    </div>

    <!-- 用户信息卡片 -->
    <div v-if="userData" class="user-card">
      <div class="card">
        <div class="card-header">
          <h3 class="mb-0"><i class="fas fa-id-card me-2"></i>用户信息详情</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <!-- 左侧：用户基本信息 -->
            <div class="col-md-4 text-center user-profile">
              <div class="user-avatar">
                <i class="fas fa-user"></i>
              </div>
              <h4 class="mt-3">{{ userData.nickname }}</h4>
              <p class="text-muted">@{{ userData.username }}</p>
              <div class="level-badge">
                <span>等级 {{ userData.level }}</span>
              </div>
              <div class="role-badge mt-2">
                <span>{{ userData.role }}</span>
              </div>
            </div>
            
            <!-- 右侧：详细信息 -->
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-6">
                  <div class="info-group">
                    <h5><i class="fas fa-info-circle me-2"></i>基本信息</h5>
                    <div class="info-item">
                      <span class="label">用户标识:</span>
                      <span class="value">{{ userData.identifier }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">用户名:</span>
                      <span class="value">{{ userData.username }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">昵称:</span>
                      <span class="value">{{ userData.nickname }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">真实姓名:</span>
                      <span class="value">{{ userData.realname }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">邮箱:</span>
                      <span class="value">{{ userData.email }}</span>
                    </div>
                  </div>
                  
                  <div class="info-group mt-4">
                    <h5><i class="fas fa-star me-2"></i>等级信息</h5>
                    <div class="info-item">
                      <span class="label">当前等级:</span>
                      <span class="value">{{ userData.level }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">经验值:</span>
                      <span class="value">{{ userData.experience }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">当前等级经验:</span>
                      <span class="value">{{ userData.current_level_xp }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">下一级所需经验:</span>
                      <span class="value">{{ userData.next_level_xp }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="info-group">
                    <h5><i class="fas fa-coins me-2"></i>资源信息</h5>
                    <div class="info-item">
                      <span class="label">代币数量:</span>
                      <span class="value">{{ userData.tokens }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">志愿服务时间:</span>
                      <span class="value">{{ userData.volunteerTime }} 小时</span>
                    </div>
                  </div>
                  
                  <div class="info-group mt-4">
                    <h5><i class="fas fa-address-card me-2"></i>其他信息</h5>
                    <div class="info-item">
                      <span class="label">头像标识:</span>
                      <span class="value text-truncate">{{ userData.avatar }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">个人简介:</span>
                      <span class="value">{{ userData.bio || '暂无' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">头衔:</span>
                      <span class="value">{{ userData.title || '暂无' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="label">角色:</span>
                      <span class="value">{{ userData.role }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 默认提示 -->
    <div v-if="!userData && !loading && !error" class="default-section">
      <div class="text-center">
        <i class="fas fa-search fa-3x mb-3"></i>
        <h4>输入API地址查询用户信息</h4>
        <p class="text-muted">请在上方输入框中输入完整的API URL，然后点击"查询用户信息"按钮</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      apiUrl: 'https://www.aidiventure.com/api/users/?identifier=724532',
      userData: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async fetchUserData() {
      // 验证输入
      if (!this.apiUrl.trim()) {
        this.error = '请输入API URL';
        return;
      }
      
      // 重置状态
      this.loading = true;
      this.error = null;
      this.userData = null;
      
      try {
        // 添加协议前缀（如果用户没有输入）
        let url = this.apiUrl.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        
        // 发送API请求
        const response = await fetch(url);
        
        // 检查响应状态
        if (!response.ok) {
          throw new Error(`网络请求失败: ${response.status} ${response.statusText}`);
        }
        
        // 解析JSON数据
        const data = await response.json();
        
        // 验证返回的数据格式
        if (!data.identifier) {
          throw new Error('返回的数据格式不正确');
        }
        
        // 更新用户数据
        this.userData = data;
      } catch (err) {
        // 处理错误
        this.error = `获取用户信息失败: ${err.message}`;
        console.error('API请求错误:', err);
      } finally {
        // 重置加载状态
        this.loading = false;
      }
    }
  },
  mounted() {
    // 组件挂载后可以执行一些初始化操作
    console.log('用户信息查询系统已加载');
  }
}
</script>

<style scoped>
:root {
  --primary: #6a11cb;
  --secondary: #2575fc;
  --success: #28a745;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --text-dark: #333333;
  --text-light: #6c757d;
}

body {
  background-color: var(--light-bg);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text-dark);
  line-height: 1.6;
}

.container {
  max-width: 1000px;
  margin-top: 30px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.header-section h1 {
  font-weight: 700;
  margin-bottom: 10px;
}

.header-section p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.input-section {
  background-color: var(--card-bg);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.form-control {
  border-radius: 10px;
  padding: 12px 20px;
  border: 1px solid #e1e5e9;
  transition: all 0.3s;
}

.form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.2rem rgba(106, 17, 203, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border: none;
  border-radius: 10px;
  padding: 12px 25px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-section {
  text-align: center;
  padding: 40px;
  background-color: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-section {
  background-color: #ffe6e6;
  color: #d63031;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  border-left: 4px solid #d63031;
}

.user-card {
  margin-bottom: 30px;
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 20px;
  border-bottom: none;
}

.card-body {
  padding: 30px;
}

.user-profile {
  border-right: 1px solid #e1e5e9;
  padding-right: 30px;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.level-badge {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
}

.role-badge {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #333;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: inline-block;
}

.info-group {
  margin-bottom: 20px;
}

.info-group h5 {
  color: var(--primary);
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e1e5e9;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f1f1f1;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: var(--text-light);
}

.value {
  color: var(--text-dark);
  text-align: right;
  max-width: 60%;
}

.default-section {
  background-color: var(--card-bg);
  border-radius: 15px;
  padding: 60px 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  margin-bottom: 30px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-profile {
    border-right: none;
    border-bottom: 1px solid #e1e5e9;
    padding-right: 0;
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  
  .info-item {
    flex-direction: column;
  }
  
  .value {
    text-align: left;
    max-width: 100%;
    margin-top: 5px;
  }
}
</style>