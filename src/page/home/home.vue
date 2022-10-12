<template>
  <div>
    home页面
    <div>{{isLogin?'已登录':'未登录'}}</div>
    <el-button>默认按钮</el-button>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from '@vue/reactivity';
  import {useStore} from "@/hooks/store"
  const {getters,state,commit}=useStore()
  const isLogin=state.loginModule.isLogin
</script>

<style lang="scss" scoped>

</style>
