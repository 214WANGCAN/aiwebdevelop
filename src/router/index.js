import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages' // 👈 自动生成的路由表

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
