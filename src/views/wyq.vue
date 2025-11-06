<template>
  <div id="app" class="container">
    <!-- 页面整体布局 -->
    <div class="content">
      <!-- 右侧区域，包含图片和评论区 -->
      <div class="right-section">
        <!-- 图片框 -->
        <div class="image-frame">
          <span class="image-text">猪咪</span>
        </div>

        <!-- 评论区 -->
        <div class="comments">
          <div v-for="(comment, index) in comments" :key="index" class="comment">
            <p>{{ comment }}</p>
          </div>
          
          <!-- 输入评论框 -->
          <input v-model="newComment" @keyup.enter="addComment" placeholder="输入评论..." class="comment-input"/>
        </div>
      </div>
      
      <!-- 竖着的选项 -->
      <div class="left-section">
        <div
          v-for="(option, index) in options"
          :key="index"
          class="option"
          @click="selectOption(option)"
          :class="{ selected: selectedOption === option }"
        >
          {{ option }}
        </div>

        <!-- 提交按钮 -->
        <button @click="submitSelection" class="submit-btn">提交选择</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: ["这个产品很好！", "很喜欢，推荐给朋友！"],
      newComment: "",
      selectedOption: null,
      options: ["夯", "顶级", "人上人", "npc", "拉完了"]
    };
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment);
        this.newComment = ""; // 清空输入框
      }
    },
    selectOption(option) {
      this.selectedOption = option;
      console.log("用户选择了:", option); // 输出选中的选项
    },
    submitSelection() {
      if (this.selectedOption) {
        alert(`已提交选择: ${this.selectedOption}`);
        // 这里可以将数据提交到后台
      } else {
        alert("请选择一个选项！");
      }
    }
  }
};
</script>

<style scoped>
/* 全局设置，确保页面是手机比例的 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.content {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  width: 360px;
  height: 640px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.right-section {
  width: 70%;
  padding: 20px;
  text-align: center;
  border-right: 1px solid #eee;
  background-color: #fafafa;
}

.image-frame {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  border: 2px dashed #009688;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #009688;
  background-color: #f0f0f0;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.image-frame:hover {
  background-color: #e0f7fa;
  border-color: #00796b;
}

.image-text {
  font-weight: bold;
}

.comments {
  margin-top: 20px;
  padding-top: 20px; /* 添加上边距，避免与图片框靠得太近 */
  border-top: 1px solid #ddd;
}

.comment {
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.comment-input {
  width: 80%;
  padding: 12px;
  margin-top: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #333;
  background-color: #fafafa;
  transition: border-color 0.3s ease;
}

.comment-input:focus {
  border-color: #009688;
  outline: none;
}

.left-section {
  width: 30%;
  background-color: #f9f9f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.option {
  padding: 12px;
  background-color: #e0e0e0;
  margin-bottom: 12px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.option:hover {
  background-color: #009688;
  color: white;
  transform: translateY(-3px);
}

.selected {
  background-color: #009688;
  color: white;
  font-weight: 700;
}

.submit-btn {
  padding: 14px;
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #00796b;
  transform: translateY(-3px);
}

.submit-btn:active {
  transform: translateY(1px);
}
</style>
