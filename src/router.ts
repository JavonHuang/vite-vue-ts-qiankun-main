import {createRouter,RouteRecordRaw,createWebHashHistory} from "vue-router"

const routes:Array<RouteRecordRaw>=[
  {
    path:"/",
    name:"login",
    component:()=>import('./page/login.vue')
  },
  {
    path:"/portal",
    name:"portal",
    component:()=>import('./page/portal/portal.vue'),
    children:[
      {
        path:"/portal",
        name:"home",
        component:()=>import('./page/home/home.vue')
      },
      {
        path:"/portal/user",
        name:"user",
        component:()=>import('./page/user/user.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router