<template>
  <div class="portal">
    <header class="header">头部{{isLogin}}{{isSystem?"System":"System未注册"}}/{{isCustomer?"Customer注册":"Customer未注册"}}</header>
    <nav>
    <div v-on:click="goSon('/portal/system/Home')">Home</div>
   <div v-on:click="goSon('/portal/system/HelloWorld')">HelloWorld</div>
       <div v-on:click="goSon('/portal/customer/Home')">Home</div>
   <div v-on:click="goSon('/portal/customer/HelloWorld')">HelloWorld</div>
    </nav>
    <section>
      <router-view> </router-view>
    <div id="yourContainer"></div>
    <div id="yourContainer1"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { mapState } from 'vuex'
import { useRouter } from 'vue-router'
import {initQiankun} from '@/qiankun'
import { onMounted,nextTick ,getCurrentInstance,computed} from 'vue';
import { useStore } from "@/hooks/store"
import API from '@/API'
import { debug } from 'util';
const router = useRouter();
const { commit, state,getters } = useStore();
const store = useStore();
const _this: any = getCurrentInstance();
const isCustomer = state.globalModule.customer
const isSystem = computed(() => state.globalModule.system)
const isLogin = computed(() => getters['loginModule/GettersIsLogin'])

onMounted(() => {
nextTick(() => { 
    getAPPList();
  })
})

//远程获取需要注册的微应用
const getAPPList = () => { 
  API.getAPPList({}).then(({ data: { models=[]} }) => { 
    initQiankun(store, models);
    commit('loginModule/CommitIsLogin',false)
  })
}

const goSon=(url:string)=>{
  router.push({ path: url})
}

</script>

<style lang="scss" scoped>
.portal{
  height: 100%;
  width: 100%;
  .header{
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-bottom: 1px solid red;
    box-sizing:border-box;
  }
  nav {
    line-height:30px;
    background-color:#eeeeee;
    height:100%;
    width:100px;
    float:left;
    padding:5px;	 
    height:calc(100% - 40px);
    box-sizing:border-box;
  }
  section {
    width:calc(100% - 100px);
    float:left;
    padding:10px;	 	 
    height:calc(100% - 40px);
    box-sizing:border-box;
  }
}
</style>
