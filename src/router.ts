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
    ]
  },
  {
    path:"/404",
    name:"404",
    component:()=>import('./page/portal/portal.vue'),
    children:[
      {
        path:"/404",
        name:"error",
        component:()=>import('./page/error/404.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  
})

export default router