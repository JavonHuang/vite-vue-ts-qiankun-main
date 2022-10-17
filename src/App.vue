<template>
  <router-view> </router-view>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import API from '@/API'
import { useRouter } from 'vue-router'

//注册全局路由，供子应用调用
const router = useRouter();
window.rootRouter = router;


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
}
html,body{
  margin: 0;
  height: 100%;
  width:100%;
}
</style>