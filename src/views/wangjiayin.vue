<!-- RandomPage.vue -->
<template>
  <div class="page">
    <!-- 顶栏 -->
    <header class="nav">
      <div class="brand">
        <div class="logo" />
        <h1>Vue + JS 小网页</h1>
      </div>
      <div class="actions">
        <button class="btn" @click="toggleTheme">{{ isLight ? '切换到暗色' : '切换到亮色' }}</button>
        <span class="clock" :title="now.toLocaleString()">{{ timeText }}</span>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="container">
      <!-- 计数器 -->
      <section class="card">
        <div class="pill">🎯 计数器</div>
        <div class="row">
          <button class="btn" @click="count--">-1</button>
          <div class="counter">{{ count }}</div>
          <button class="btn" @click="count++">+1</button>
          <button class="btn ghost" @click="count = 0">重置</button>
        </div>
        <p class="muted">计数值自动保存到 localStorage。</p>
      </section>

      <!-- 待办清单 -->
      <section class="card">
        <div class="pill">🗒️ 待办清单</div>
        <div class="row">
          <input
            class="input"
            v-model.trim="todoText"
            placeholder="例如：写一首小曲子"
            @keyup.enter="addTodo"
          />
          <button class="btn" @click="addTodo">添加</button>
        </div>

        <ul class="todo">
          <li v-for="it in todos" :key="it.id">
            <label class="left">
              <input type="checkbox" v-model="it.done" />
              <span :class="{ done: it.done }">{{ it.text }}</span>
            </label>
            <button class="btn ghost sm" @click="removeTodo(it.id)">删除</button>
          </li>
        </ul>

        <div class="muted">未完成：{{ leftCount }} 项</div>
      </section>

      <!-- 小画廊 -->
      <section class="card">
        <div class="pill">🖼️ 小画廊（静态数据）</div>
        <div class="grid">
          <article v-for="card in gallery" :key="card.id" class="mini-card">
            <div class="emoji">{{ card.emoji }}</div>
            <div class="title">{{ card.title }}</div>
            <p class="muted">{{ card.desc }}</p>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer">
      Made with ❤️ · Vue 3 + <code>&lt;script setup&gt;</code>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

// ---- 主题切换（持久化） ----
const isLight = ref(false)
const applyTheme = () => {
  document.documentElement.classList.toggle('light', isLight.value)
}
const toggleTheme = () => {
  isLight.value = !isLight.value
}
watch(isLight, v => {
  localStorage.setItem('theme', v ? 'light' : 'dark')
  applyTheme()
})

// ---- 计时器显示 ----
const now = ref(new Date())
let timer = null
const timeText = computed(() =>
  now.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
)

// ---- 计数器（持久化） ----
const count = ref(parseInt(localStorage.getItem('count') || '0', 10) || 0)
watch(count, v => localStorage.setItem('count', String(v)))

// ---- 待办清单（持久化） ----
const todoText = ref('')
const todos = ref(loadTodos())
function loadTodos () {
  try {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  } catch {
    return []
  }
}
const uid = () => (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2))
function addTodo () {
  if (!todoText.value) return
  todos.value.unshift({ id: uid(), text: todoText.value, done: false })
  todoText.value = ''
}
function removeTodo (id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
watch(todos, v => localStorage.setItem('todos', JSON.stringify(v)), { deep: true })
const leftCount = computed(() => todos.value.filter(t => !t.done).length)

// ---- 画廊（静态数据） ----
const gallery = ref([
  { id: 1, emoji: '💎', title: '轻盈 UI', desc: '圆角、阴影与柔和色彩' },
  { id: 2, emoji: '⚡', title: '即时响应', desc: '数据双向绑定，所见即所得' },
  { id: 3, emoji: '🧩', title: '易扩展', desc: '轻松接入路由、状态、请求' }
])

// ---- 生命周期 ----
onMounted(() => {
  isLight.value = localStorage.getItem('theme') === 'light'
  applyTheme()
  timer = setInterval(() => (now.value = new Date()), 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
:root {
  --bg: #0b1020;
  --card: #121a36;
  --ink: #e7ecff;
  --muted: #9fb0ff;
  --ring: #7aa2ff44;
}
:root.light {
  --bg: #f6f8ff;
  --card: #ffffff;
  --ink: #0b1020;
  --muted: #4b5a88;
  --ring: #2a66ff33;
}

.page { min-height: 100vh; background: radial-gradient(1000px 500px at 10% -10%, #1a2455 0%, transparent 40%), radial-gradient(900px 500px at 120% 0%, #3340a0 0%, transparent 40%), var(--bg); color: var(--ink); }
.container { max-width: 980px; margin: 0 auto; padding: 20px; }

/* 顶栏 */
.nav { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; backdrop-filter: saturate(140%) blur(10px); border-bottom: 1px solid var(--ring); }
.brand { display: flex; align-items: center; gap: 12px; }
.logo { width: 28px; height: 28px; border-radius: 8px; background: conic-gradient(from 270deg, #7aa2ff, #a176ff, #63ffc3, #7aa2ff); box-shadow: 0 0 0 3px #ffffff22; }
.actions { display: flex; align-items: center; gap: 12px; }
.clock { font-variant-numeric: tabular-nums; opacity: .9; }

/* 卡片 */
.card { background: linear-gradient(180deg, #ffffff08, #00000022), var(--card); border: 1px solid var(--ring); border-radius: 16px; padding: 16px; margin: 16px 0; box-shadow: 0 10px 30px #00000022; }
.pill { display: inline-flex; gap: 8px; align-items: center; border: 1px solid var(--ring); border-radius: 999px; padding: 6px 10px; font-size: 12px; margin-bottom: 8px; color: var(--muted); }
.row { display: flex; gap: 10px; align-items: center; margin: 10px 0; }
.left { display: flex; align-items: center; gap: 10px; }
.counter { font-size: 28px; font-weight: 700; min-width: 60px; text-align: center; }

/* 列表与输入 */
.input { flex: 1; min-width: 200px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--ring); background: transparent; color: var(--ink); }
.todo { list-style: none; padding: 0; margin: 10px 0 0; }
.todo li { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px dashed #ffffff22; }
.done { text-decoration: line-through; opacity: .6; }

/* 小画廊 */
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 14px; }
.mini-card { grid-column: span 12; border: 1px dashed var(--ring); border-radius: 14px; padding: 14px; }
.mini-card .emoji { font-size: 22px; }
.mini-card .title { font-weight: 700; margin: 6px 0; }
@media (min-width: 720px) {
  .mini-card { grid-column: span 4; }
}

/* 其他 */
.btn { border: 1px solid var(--ring); background: #00000022; color: var(--ink); padding: 8px 12px; border-radius: 12px; cursor: pointer; }
.btn.ghost { background: transparent; }
.btn.sm { padding: 6px 10px; }
.btn:hover { transform: translateY(-1px); }
.muted { color: var(--muted); }
.footer { text-align: center; padding: 30px 12px; opacity: .8; }
</style>
