import { useBlogStore } from '@/store/blogStore'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {visitorAxios} from './visitorAxios'

const isVisitorChecked = ref<boolean>(false) 
const visitorInitCheck = (uri: string)=>{
  isVisitorChecked.value=true
  visitorAxios().requestInitVisitor(uri)  
}
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
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/MenuPage/MenuPage.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {  


  if(to.path==='/category' || from.path==='/category'||window.location.host==document.referrer.split("/")[2]){
    isVisitorChecked.value=true
  }
  if(!isVisitorChecked.value&&document.referrer.length!==0){
    visitorInitCheck(document.referrer)
  }
  if(to.path==="/read"){
    visitorAxios().requestArticleOpenCount(to.fullPath.split("=")[1] as unknown as number)
  } 
  next()
})

export default router
