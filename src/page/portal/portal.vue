<template>
  <div class="portal">
    <header class="header">
      <div class="left">
        <img src="./../../assets/logo.png"/>
        <span>乾坤主框架</span>
      </div>
      <div class="right">
        <div>头部{{isLogin}}{{isSystem?"System":"System未注册"}}/{{isCustomer?"Customer注册":"Customer未注册"}}</div>
        <div v-on:click="goSon('/')">退出</div>
      </div>
    </header>
    <div class="contain">
      <div class="menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
          <el-menu-item index="1-1-1" v-on:click="goSon('/portal/home')">主应用 Home</el-menu-item>
          <el-menu-item index="1-1-1" v-on:click="goSon('/portal/system/Home')">system Home</el-menu-item>
          <el-menu-item index="1-1-2" v-on:click="goSon('/portal/system/HelloWorld')">system HelloWorld</el-menu-item>
          <el-menu-item index="1-1-3" v-on:click="goSon('/portal/system/HelloWorld/32ew')">system error</el-menu-item>
          <el-menu-item index="1-2-1" v-on:click="goSon('/portal/customer/Home')">customer Home</el-menu-item>
          <el-menu-item index="1-2-2" v-on:click="goSon('/portal/customer/HelloWorld')">customer HelloWorld</el-menu-item>
          <el-menu-item index="1-2-3" v-on:click="goSon('/portal/customerrere/5445HelloWorld080988/080988')">customer error</el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view class="router-app"> </router-view>
        <div id="yourContainer" class="qiankun-app"></div>
        <div id="yourContainer1" class="qiankun-app"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter,onBeforeRouteUpdate } from 'vue-router'
import { onMounted, nextTick, computed } from 'vue';
import { useStore } from "@/hooks/store"
import {initQiankun} from '@/qiankun'
import API from '@/API'
import { ElLoading } from 'element-plus'

const router = useRouter();
const {state,getters } = useStore();
const store = useStore();
const isCustomer = state.globalModule.customer
const isSystem = state.globalModule.system
const isLogin = computed(() => getters['loginModule/GettersIsLogin'])
let appList:Array<any> = [];
let loadingInstance: any = null

onBeforeRouteUpdate((to,from) => { 
   checkRouter(appList,to.fullPath,to.name);
})

onMounted(() => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  nextTick(() => { 
    getAPPList();
  })
})

//远程获取需要注册的微应用
const getAPPList = () => { 
  API.getAPPList({}).then(({ data: { models = [] } }) => { 
    appList = models;
    initQiankun(store, models, (e) => { 
      router.push({ path: '/404'})
    });
    loadingInstance.close();
    checkRouter(models,router.currentRoute.value.fullPath,router.currentRoute.value.name);
  })
}

//校验路由
const checkRouter = (models:Array<any>,fullPath:string,name:any) => { 
  let result = models.some((item: any) => {
    let regStr = (item.mainRouterPath+"/").replace(/\//g, '\\\/');
      let reg = eval(`/^(${regStr})/`);
      return reg.test(fullPath)
  })
  if (!result && !name) { 
    router.push({ path: '/404'})
  }
}

const goSon = (url:any) => {
  router.push({ path: url})
}

</script>

<style lang="scss" scoped>
.portal{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .contain{
    display: flex;
    height: 100%;
    .menu{
      width: 240px;
      height: 100%;
      .el-menu{
        border: none;
      }
    }
    .main{
      width:100%;
      height: 100%;
      background-color: rgb(222, 222, 222);
      padding: 10px;
      box-sizing: border-box;
      // display: flex;
      .router-app{
        border-radius: 4px;
        background-color: #fff;
        width: 100%;
        height: 100%;
      }
      .qiankun-app{
        width: 100%;
        height: 100%;
        display: none;
        background-color: #fff;
      }
    }
  }
  .header{
    display: flex;
    height: 60px;
    line-height: 60px;
    width: 100%;
    border-bottom: 1px solid rgb(166, 164, 164);
    box-sizing:border-box;
    padding: 0 10px;
    .left{
      width: 240px;
      text-align: left;
      img{
        height: 60px;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
        margin: auto 10px;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .right{
      width: 100%;
      display:flex;
      justify-content: space-between;
    }
  }
}
</style>
