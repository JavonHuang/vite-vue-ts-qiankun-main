<template>
  <div class="error-404">
    <div class="msg">
      <span>{{routeMsg.name?`应用${routeMsg.name}加载异常，请联系管理员...`:`页面不存在...`}}</span>
      <br/>
      <span>{{routeMsg.message}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
const route = useRoute();
let routeMsg = reactive(route.params);
</script>

<style lang="scss" scoped>
.error-404{
  background:url('./../../assets/404.webp');
  background-repeat: no-repeat;
  background-size:auto 100%;
  background-position: center;
  background-color: #fff;
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
  .msg{
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    font-size: 20px;
  }
}
</style>
