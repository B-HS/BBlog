import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios'
const app = createApp(App)
const pinia = createPinia()
axios.defaults.baseURL = 'http://127.0.0.1:8080/blogapi';
app.use(router)
app.use(pinia)
app.mount('#app')
