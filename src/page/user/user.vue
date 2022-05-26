<template>
  <div>
    user页面
    {{myname}}、{{name}}
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
</script>

<style lang="scss" scoped>

</style>
