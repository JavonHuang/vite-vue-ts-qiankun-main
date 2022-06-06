import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router';
import store from './store/index';


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
console.log(import.meta.env.VITE_SOME_KEY)
console.log(import.meta.env.VITE_SOME_KEY_UU)
import {initQiankun} from '@/qiankun'
initQiankun()