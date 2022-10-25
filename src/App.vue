<template>
  <router-view> </router-view>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { onBeforeMount } from 'vue';
import API from '@/API'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from "@/hooks/store"
const appList: any = computed(() => getters['globalModule/GetGppList'])

const {getters } = useStore()

//注册全局路由，供子应用调用
const router = useRouter();
window.rootRouter = router;


const checkRouter = (models:[], fullPath: string, name: any) => { 
  let result = models.some((item: any) => {
    let regStr = (item.mainRouterPath+"/").replace(/\//g, '\\\/');
      let reg = eval(`/^(${regStr})/`);
      return reg.test(fullPath)
  })
  if (!result && (!name||name==='portal')) { 
    return false;
  }
  return true;
}

///路由守卫
router.beforeEach((to, from, next) => {
  if (checkRouter(appList.value, to.fullPath, to.name)) {
    next()
  } else { 
    router.push({ path: '/404'})
  }
})

onBeforeMount(()=>{
  API.getLibList({}).then(({ data: { models = [] } }) => {
    models.forEach((item:any)=>{
      loadScript(item.js)
      loadCss(item.css)
    })
  })
})

const loadScript=(url:string)=>{
  let scriptDom = document.createElement('script')
  scriptDom.type = 'text/javascript';
  scriptDom.src = url;
  document.body.append(scriptDom);
}

const loadCss=(url:string)=>{
  let linkDom = document.createElement('link')
  linkDom.rel = 'stylesheet';
  linkDom.href = url;
  document.body.append(linkDom);
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width:100%;
  overflow: hidden;
}
html,body{
  margin: 0;
  height: 100%;
  width:100%;
  overflow: hidden;
}
</style>