<template>
  <div :class="['app', theme]">
    <!-- Header -->
    <header class="header">
      <h1 class="title">Vue + JS Playground</h1>
      <div class="header-actions">
        <span class="clock" :aria-label="`Now: ${nowReadable}`">🕒 {{ nowReadable }}</span>
        <button class="btn" @click="toggleTheme" :aria-pressed="theme==='dark'">
          {{ theme === 'dark' ? '☀️ 浅色主题' : '🌙 深色主题' }}
        </button>
        <button class="btn primary" @click="openAbout = true">关于本页</button>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <p class="lead">一个随手可用的 <strong>Vue 3 + JavaScript</strong> 单文件组件示例，包含计数器、待办、表格排序、主题切换与本地持久化。</p>
      <div class="cta">
        <button class="btn" @click="increment">+1</button>
        <button class="btn" @click="decrement" :disabled="count === 0">-1</button>
        <button class="btn outline" @click="reset">重置</button>
        <span class="badge" :class="{warn: count > 10}">计数：{{ count }}</span>
      </div>
    </section>

    <!-- Panels -->
    <main class="grid">
      <!-- Todo Panel -->
      <section class="card">
        <header class="card-header">
          <h2>📝 待办清单</h2>
          <div class="tools">
            <input
              v-model.trim="todoInput"
              class="input"
              type="text"
              placeholder="添加一个待办…"
              @keyup.enter="addTodo"
              aria-label="新待办"
            />
            <button class="btn primary" @click="addTodo">添加</button>
          </div>
        </header>

        <div class="toolbar">
          <input v-model.trim="query" class="input" placeholder="搜索…" aria-label="搜索待办" />
          <label class="checkbox">
            <input type="checkbox" v-model="hideDone" />
            仅显示未完成
          </label>
          <button class="btn subtle" @click="clearCompleted" :disabled="completedCount===0">清除已完成 ({{ completedCount }})</button>
        </div>

        <ul class="todos" role="list">
          <li v-for="t in filteredTodos" :key="t.id" class="todo">
            <label class="todo-label">
              <input type="checkbox" v-model="t.done" />
              <span :class="{done: t.done}">{{ t.text }}</span>
            </label>
            <button class="icon" @click="removeTodo(t.id)" aria-label="删除">✖</button>
          </li>
        </ul>

        <footer class="card-footer">
          <small>共 {{ todos.length }} 项 · 已完成 {{ completedCount }} 项</small>
        </footer>
      </section>

      <!-- Table Panel -->
      <section class="card">
        <header class="card-header">
          <h2>📊 示例数据表</h2>
          <div class="tools">
            <button class="btn subtle" @click="shuffleRows">打乱</button>
            <button class="btn subtle" @click="resetRows">重置</button>
          </div>
        </header>

        <div class="table-wrap" role="region" aria-label="示例数据表">
          <table class="table">
            <thead>
              <tr>
                <th><button class="th-btn" @click="sortBy('name')">名称 {{ sortIndicator('name') }}</button></th>
                <th><button class="th-btn" @click="sortBy('score')">分数 {{ sortIndicator('score') }}</button></th>
                <th><button class="th-btn" @click="sortBy('updated')">更新时间 {{ sortIndicator('updated') }}</button></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in sortedRows" :key="row.id">
                <td>{{ row.name }}</td>
                <td>{{ row.score }}</td>
                <td>{{ formatDate(row.updated) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- About Modal -->
    <div v-if="openAbout" class="modal-backdrop" @click.self="openAbout=false">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="aboutTitle">
        <header class="modal-header">
          <h3 id="aboutTitle">关于此示例</h3>
          <button class="icon" @click="openAbout=false" aria-label="关闭">✖</button>
        </header>
        <section class="modal-body">
          <ul>
            <li>⚙️ 技术栈：Vue 3 + 组合式 API（JavaScript）。</li>
            <li>💾 数据持久化：待办使用 <code>localStorage</code>。</li>
            <li>🌓 主题：浅色 / 深色，可持久化。</li>
            <li>♿ 无障碍：语义化标签与可点击表头排序按钮。</li>
          </ul>
        </section>
        <footer class="modal-footer">
          <button class="btn primary" @click="openAbout=false">我知道了</button>
        </footer>
      </div>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
      <small>Made with ❤️ &nbsp;·&nbsp; 无需依赖第三方库，可直接复制到项目中使用</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

// ===== Theme =====
const theme = ref(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
watch(theme, v => localStorage.setItem('theme', v))

// ===== Clock =====
const now = ref(new Date())
let timer
onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 1000)
})
onUnmounted(() => clearInterval(timer))
const nowReadable = computed(() => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'medium' }).format(now.value))

// ===== Counter =====
const count = ref(0)
const increment = () => count.value++
const decrement = () => (count.value = Math.max(0, count.value - 1))
const reset = () => (count.value = 0)

// ===== Todos =====
const STORAGE_KEY = 'vue-playground-todos'
const todos = ref(loadTodos())
const todoInput = ref('')
const query = ref('')
const hideDone = ref(false)

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : [
      { id: crypto.randomUUID(), text: '试着添加一条待办', done: false },
      { id: crypto.randomUUID(), text: '勾选变更状态', done: true },
      { id: crypto.randomUUID(), text: '点击 ✖ 删除', done: false },
    ]
  } catch (e) {
    return []
  }
}
watch(todos, v => localStorage.setItem(STORAGE_KEY, JSON.stringify(v)), { deep: true })

const filteredTodos = computed(() => {
  const q = query.value.toLowerCase()
  return todos.value.filter(t => {
    const okText = !q || t.text.toLowerCase().includes(q)
    const okDone = !hideDone.value || !t.done
    return okText && okDone
  })
})
const completedCount = computed(() => todos.value.filter(t => t.done).length)

function addTodo() {
  const text = todoInput.value.trim()
  if (!text) return
  todos.value.unshift({ id: crypto.randomUUID(), text, done: false })
  todoInput.value = ''
}
function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
function clearCompleted() {
  todos.value = todos.value.filter(t => !t.done)
}

// ===== Table =====
const initialRows = () => ([
  { id: 1, name: 'Alpha', score: 83, updated: new Date(Date.now() - 3600e3 * 2) },
  { id: 2, name: 'Bravo', score: 91, updated: new Date(Date.now() - 3600e3 * 8) },
  { id: 3, name: 'Charlie', score: 76, updated: new Date(Date.now() - 3600e3 * 24) },
  { id: 4, name: 'Delta', score: 88, updated: new Date(Date.now() - 3600e3 * 4) },
  { id: 5, name: 'Echo', score: 67, updated: new Date(Date.now() - 3600e3 * 1) },
])
const rows = ref(initialRows())

const sort = reactive({ key: 'updated', dir: 'desc' })
function sortBy(key) {
  sort.dir = (sort.key === key && sort.dir === 'asc') ? 'desc' : 'asc'
  sort.key = key
}
function sortIndicator(key) {
  if (sort.key !== key) return '↕'
  return sort.dir === 'asc' ? '↑' : '↓'
}
const sortedRows = computed(() => {
  const arr = [...rows.value]
  const { key, dir } = sort
  arr.sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av === bv) return 0
    if (av > bv) return dir === 'asc' ? 1 : -1
    return dir === 'asc' ? -1 : 1
  })
  return arr
})
function shuffleRows() {
  rows.value = [...rows.value].sort(() => Math.random() - 0.5)
}
function resetRows() {
  rows.value = initialRows()
  sort.key = 'updated'
  sort.dir = 'desc'
}
function formatDate(d) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' }).format(d)
}

// ===== Modal =====
const openAbout = ref(false)
</script>

<style scoped>
:root {
  --bg: #0b1020;
  --panel: #121a33;
  --text: #e6e9f2;
  --muted: #a5b0d6;
  --brand: #7c9cff;
  --border: #233056;
  --danger: #ff6b6b;
}
.light {
  --bg: #f6f8ff;
  --panel: #ffffff;
  --text: #0b1020;
  --muted: #5b647a;
  --brand: #3b82f6;
  --border: #e6e9f2;
  --danger: #e11d48;
}
.app {
  min-height: 100svh;
  background: var(--bg);
  color: var(--text);
  transition: background .2s ease, color .2s ease;
}
.header {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px clamp(16px, 4vw, 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.title { font-size: clamp(20px, 2.5vw, 28px); font-weight: 800; letter-spacing: .3px; }
.header-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.clock { opacity: .8; font-variant-numeric: tabular-nums; }
.btn {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 8px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform .06s ease, background .2s ease, border-color .2s;
}
.btn:hover { transform: translateY(-1px); border-color: var(--brand); }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.btn.primary { background: var(--brand); color: white; border-color: var(--brand); }
.btn.outline { background: transparent; }
.btn.subtle { background: rgba(255,255,255,.05); }
.badge { margin-left: 8px; padding: 6px 10px; border: 1px dashed var(--border); border-radius: 10px; font-variant-numeric: tabular-nums; }
.badge.warn { border-style: solid; border-color: var(--danger); }

.hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 6px clamp(16px, 4vw, 32px) 24px;
}
.lead { opacity: .9; line-height: 1.6; }
.cta { margin-top: 12px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

.grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px) 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}
.card {
  grid-column: span 12;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,.12);
}
@media (min-width: 860px) {
  .card { grid-column: span 6; }
}
.card-header, .card-footer { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.card-footer { border-top: 1px solid var(--border); border-bottom: 0; justify-content: flex-end; }
.tools { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.toolbar { padding: 12px 16px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; border-bottom: 1px dashed var(--border); }
.input {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 8px 10px;
  border-radius: 10px;
  min-width: 220px;
}
.checkbox { display: flex; align-items: center; gap: 6px; opacity: .9; }
.todos { list-style: none; margin: 0; padding: 0; }
.todo { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 16px; border-bottom: 1px dashed var(--border); }
.todo:last-child { border-bottom: 0; }
.todo-label { display: flex; align-items: center; gap: 10px; }
.todo-label .done { text-decoration: line-through; opacity: .6; }
.icon { border: 0; background: transparent; color: var(--muted); cursor: pointer; font-size: 18px; }
.icon:hover { color: var(--danger); }

.table-wrap { width: 100%; overflow: auto; }
.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: 12px 14px; border-bottom: 1px solid var(--border); text-align: left; }
.th-btn { background: transparent; border: 0; cursor: pointer; font-weight: 700; color: var(--text); }

.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; padding: 16px; }
.modal { width: min(640px, 96vw); background: var(--panel); color: var(--text); border: 1px solid var(--border); border-radius: 16px; box-shadow: 0 14px 50px rgba(0,0,0,.35); }
.modal-header, .modal-footer { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.modal-footer { border-top: 1px solid var(--border); border-bottom: 0; justify-content: flex-end; }
.modal-body { padding: 16px; }

.site-footer { max-width: 1100px; margin: 24px auto; padding: 0 clamp(16px, 4vw, 32px) 40px; opacity: .7; }

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}
</style>
