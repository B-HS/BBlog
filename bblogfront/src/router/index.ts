import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/read',
      name: 'read',
      component: () => import('@/views/Article/Article.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('@/views/Write/Write.vue')
    },
    {
      path: '/setting',
      name: 'admin',
      component: () => import('@/views/Admin/Admin.vue')
    }
  ]
})

export default router
