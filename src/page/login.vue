<template>
  <div class="login">
    <div class="main">
      <div>
        <img src="./../assets/logo.png"/>
        <el-button v-on:click="login" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {useStore} from "@/hooks/store"
const router = useRouter()
const { commit } = useStore()


const login=()=>{
  commit('loginModule/CommitIsLogin',true)
  commit('userModule/CommitUser',{
    name:"Javon",
    age:28
  })
  router.push({ path: '/main' ,query:{
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
    width: 400px;
    height: 300px;
    margin: auto;
    background-color:#fff;
    border-radius: 4px;
    opacity: 0.6;
    padding: 10px 40px;
    box-sizing:border-box;
    &>div{
      display: flex;
      flex-direction: column;
      text-align: center;
      img{
        width: 150px;
        height: 150px;
        margin:10px auto;
        margin-top: 50px;
      }
    }
  }
}
</style>
