import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { visitorAxios } from './visitorAxios'
import { PiCookie } from "../store/Cookie/PiCookie"
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/store/userStore'

const isVisitorChecked = ref<boolean>(false)
const visitorInitCheck = (uri: string) => {
	isVisitorChecked.value = true
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
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('@/views/Logout/Logout.vue')
		},
		{
			path: '/join',
			name: 'Join',
			component: () => import('@/views/Register/Join.vue')
		},
		{
			path: '/initoauth',
			name: 'oauthInit',
			component: ()=> import('@/views/Register/OAuth2Joinpage/OAuth2.vue'),
		}
	]
})


router.beforeEach((to, from, next) => {
	const userStore = useUserStore()
	if (userStore.getUserInfo.token && userStore.getRtkn) {
		PiCookie("127.0.0.1", 1, false, 'strict').setCookie("a", userStore.getUserInfo.token)
		PiCookie("127.0.0.1", 1, false, 'strict').setCookie("r", userStore.getRtkn)
		PiCookie("127.0.0.1", 1, false, 'strict').setCookie("user", JSON.stringify(userStore.getUserInfoWithoutTkn))		
	}
	
	if (PiCookie().getCookie("a") && PiCookie().getCookie("r")&&PiCookie().getCookie("user")) {
		const info = JSON.parse(PiCookie().getCookie('user') as string)
		userStore.setUserInfo(PiCookie().getCookie("a") as string,info.id, info.num, info.username ,PiCookie().getCookie("r") as string)
	}

	if (to.path ==='/initoauth'){
		userStore.isOauth().then(res=>{
			if(res.data!=true){
				router.push("/logout")
			}
		})
	}

	if (to.path ==='/logout'){
		PiCookie().rmCookie("a")
		PiCookie().rmCookie("r")
		PiCookie().rmCookie("user")
	}

	if (to.path === '/category' || from.path === '/category' || window.location.host == document.referrer.split("/")[2]) {
		isVisitorChecked.value = true
	}
	if (!isVisitorChecked.value && document.referrer.length !== 0) {
		visitorInitCheck(document.referrer)
	}
	if (to.path === "/read") {
		visitorAxios().requestArticleOpenCount(to.fullPath.split("=")[1] as unknown as number)
	}
	next()
})

export default router
