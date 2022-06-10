<template>
  <div class="portal">
    <header class="header">头部</header>
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
  import { useRouter } from 'vue-router'
  import {initQiankun,setData} from '@/qiankun'
  import { onMounted,nextTick ,getCurrentInstance} from 'vue';
  const router = useRouter()

  const _this: any = getCurrentInstance()

  onMounted(() => {
  nextTick(() => { 
    initQiankun();
    setData("黄玉超");
    })
  })


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
