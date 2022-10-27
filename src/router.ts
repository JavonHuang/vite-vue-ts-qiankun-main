import {createRouter,RouteRecordRaw,createWebHashHistory} from "vue-router"
//预设路由，用于解决刷新，首次无法获取到路由
const presetPath = ['system', 'customer', 'personal', 'vitevue']

const routes:Array<RouteRecordRaw>=[
  {
    path:"/login",
    name:"login",
    component:()=>import('./page/login.vue')
  },
  {
    path:"/",
    name:"portal",
    component:()=>import('./page/portal/portal.vue'),
    children: [
      {
        path:"/main",
        name:"main",
        component:()=>import('./page/portal/main.vue'),
      },
      {
        path:"/home",
        name:"home",
        component:()=>import('./page/home/home.vue'),
      },
    ]
  },
  {
    path:"/vitevue/:chapters*",
    name:"vitevue",
    component:()=>import('./page/portal/portal.vue'),
    children: [
      //动态路由
    ]
  },
  {
    path:"/404",
    name:"error",
    component:()=>import('./page/portal/portal.vue'),
    children:[
      {
        path:"/404",
        name:"404",
        component:()=>import('./page/error/404.vue')
      },
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const addQiankunItemRouter = (path: string) => { 
  router.addRoute({
    path:`/${path}/:chapters*`,
    name:path,
    component:()=>import('./page/portal/portal.vue'),
    children: [
      {
        path:`/${path}/:pathMatch(.*)`,
        redirect: '/404'
      }
    ]
  })
  router.addRoute( {
    path: `/${path}/:pathMatch(.*)`,
    name:`404_${path}`,
    redirect: '/404'
  })
}

presetPath.forEach(item => {
  addQiankunItemRouter(item)
})

const checkQiankunItemRouter = (path: string) => { 
  let index = presetPath.findIndex(item => path == item)
  if (index == -1) { 
    router.removeRoute(path)
    router.removeRoute(`404_${path}`)
  }
}

export {routes, router,checkQiankunItemRouter}