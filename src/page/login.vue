<template>
  <div class="login">
    <div class="main">
      <div>
        <el-button v-on:click="login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import {useStore} from "@/hooks/store"
const router = useRouter()
const {getters,state,commit}=useStore()
const myname=computed(()=>getters['userModule/GettersUserItem'](28)?.name)
const name=state.userModule.user[0].age

const login=()=>{
  commit('loginModule/CommitIsLogin',true)
  commit('userModule/CommitUser',{
    name:"黄玉超",
    age:28
  })
  router.push({ path: '/portal' ,query:{
    test:"huhi"
  }})
}

</script>

<style lang="scss" scoped>
.login{
  background-color:rgb(170 238 254 / 69%);
  height: 100%;
  width:100%;
  display: flex;
  .main{
    width: 200px;
    height: 200px;
    margin: auto;
    // background-color:rgb(228, 227, 227);
  }
}
</style>
