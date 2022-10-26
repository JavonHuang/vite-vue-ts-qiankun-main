import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router,routes} from './router';
import store from './store/index';

///全局注册主应用loading，可供子应用调用
import { mainLoading } from './utils/loading';
window.mainLoading = mainLoading;
window.addRouter = (r:any) => { 
  
}

//校验路由
router.beforeEach((to, from) => {
  if (!to.name) {
    return { name: '404' }
  } else { 
    return true
  }
})
const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
console.log(import.meta.env.BASE_URL)
console.log(import.meta.env.VITE_BASE_URL)