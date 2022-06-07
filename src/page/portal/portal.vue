<template>
  <div class="portal">
    <header class="header">头部</header>
    <nav>
    <div v-on:click="goSon">左侧菜单</div>
    London<br>
    Paris<br>
    Tokyo<br>
    </nav>
    <section>
      <router-view> </router-view>
      <div id="yourContainer"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import {initQiankun} from '@/qiankun'
  import { onMounted } from 'vue';
  const router = useRouter()

  onMounted(()=>{
    initQiankun();
  })


  const goSon=()=>{
    router.push({ path: '/portal/Home'})
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
