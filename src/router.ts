import { basename } from "path"
import {createRouter,RouteRecordRaw,createWebHashHistory} from "vue-router"

const routes:Array<RouteRecordRaw>=[
  {
    path:"/",
    name:"login",
    component:()=>import('./page/login.vue')
  },
  {
    path:"/portal/:chapters*",
    name:"portal",
    component:()=>import('./page/portal/portal.vue'),
    children:[
      // {
      //   path:"/portal",
      //   name:"home",
      //   component:()=>import('./page/home/home.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  
})

export default router