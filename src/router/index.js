import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
<<<<<<< HEAD
      path: '/TY',

      path: '/GLF',
      name: 'GLF',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GLF.vue'),
    },
    {
      path: 'TY',
>>>>>>> b00e9a5193a089a986ec2aa876013dd81129c50d
      name: 'TY',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/wyq.vue'),
    },
    {
 HEAD
      path: '/bfxzhy',
      name: 'bfxzhy',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/bfxzhy.vue'),
    }

      path: '/wangcan',
      name: 'wangcan',
      component: () => import('../views/Wangcan.vue'),
    },
    {
      path: '/tzl',
      name: 'tzl',
      component: () => import('../views/tzl.vue'),
    },
 b00e9a5193a089a986ec2aa876013dd81129c50d
  ],
})

export default router
