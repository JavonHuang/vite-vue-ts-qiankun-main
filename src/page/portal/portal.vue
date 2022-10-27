<template>
  <div class="portal">
    <header class="header">
      <div class="left">
        <img src="./../../assets/logo.png"/>
        <span>乾坤主框架</span>
      </div>
      <div class="right">
        <div>{{isLogin?"已登录":"未登录"}}</div>
        <div v-on:click="goSon('/login')">退出</div>
      </div>
    </header>
    <div class="contain">
      <div class="menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
          >
          <el-sub-menu index="1">
            <template #title>
              <span>主应用页面</span>
            </template>
            <el-menu-item index="1-1" v-on:click="goSon('/home')">主应用 Home</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>system页面</span>
            </template>
            <el-menu-item index="2-1" v-on:click="goSon('/system/Home')">system Home</el-menu-item>
            <el-menu-item index="2-2" v-on:click="goSon('/system/HelloWorld')">system HelloWorld</el-menu-item>
            <el-menu-item index="2-3" v-on:click="goSon('/system/HelloWorld34/32ew')">system error</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>customer页面</span>
            </template>
            <el-menu-item index="3-1" v-on:click="goSon('/customer/Home')">customer Home</el-menu-item>
            <el-menu-item index="3-2" v-on:click="goSon('/customer/HelloWorld')">customer HelloWorld</el-menu-item>
            <el-menu-item index="3-3" v-on:click="goSon('/customer/HelloWorld23/080988')">customer error</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>personal页面</span>
            </template>
            <el-menu-item index="4-1" v-on:click="goSon('/personal/home')">子应用间路由传参</el-menu-item>
            <el-menu-item index="4-2" v-on:click="goSon('/personal/VueComponent')">react项目使用Vue组件</el-menu-item>
            <el-menu-item index="4-3" v-on:click="goSon('/personal/lifecycle')">组件生命周期测试</el-menu-item>
            <el-menu-item index="4-4" v-on:click="goSon('/personal/useContextTest')">useContext测试</el-menu-item>
            <el-menu-item index="4-5" v-on:click="goSon('/personal/useDiy')">useDiy自定义hook</el-menu-item>
            <el-menu-item index="4-6" v-on:click="goSon('/personal/useMemoTest')">useMemoTest测试</el-menu-item>
            <el-menu-item index="4-7" v-on:click="goSon('/personal/useReducerTest')">useReducer测试</el-menu-item>
            <el-menu-item index="4-20" v-on:click="goSon('/personal/080988')">personal error</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>vitevue页面</span>
            </template>
            <el-menu-item index="5-1" v-on:click="goSon('/vitevue/login')">子应用间路由传参</el-menu-item>
           
          </el-sub-menu>
        </el-menu>
      </div>
      <div id="qiankunContainer" class="main">
        <router-view class="router-app"> </router-view>
        <!-- <div id="system" class="qiankun-app"></div>
        <div id="customer" class="qiankun-app"></div>
        <div id="personal" class="qiankun-app"></div>
        <div id="vitevue" class="qiankun-app"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {checkQiankunItemRouter} from './../../router';
import { useRouter } from 'vue-router'
import { onMounted, nextTick, computed } from 'vue';
import { useStore } from "@/hooks/store"
import {initQiankun} from '@/qiankun'
import API from '@/API'
import { ElLoading } from 'element-plus'

const router = useRouter();
const {getters,commit } = useStore();
const store = useStore();
const isLogin = computed(() => getters['loginModule/GettersIsLogin'])
let appList:any=[]
let loadingInstance: any = null

onMounted(() => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  getAPPList();
})

//远程获取需要注册的微应用
const getAPPList = () => { 
  API.getAPPList({}).then(({ data: { models = [] } }) => { 
    appList = models;
    appList.forEach((item:any) => {
      checkQiankunItemRouter(item.name)
    });
    initQiankun(store, models, (e:any) => { 
      router.push({ name: '404', params: e})
    });
    loadingInstance.close();
    commit('globalModule/GppList',appList)
  })
}


const goSon = (url:any) => {
  router.push({ 
    path: url,
    params: {
      "name":"Javon_huang"
    }
  })
}

</script>

<style lang="scss">
.portal{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .contain{
    display: flex;
    height: 100%;
    overflow: hidden;
    .menu{
      width: 240px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
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
        &>div{
          height: 100%!important;
        }
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
