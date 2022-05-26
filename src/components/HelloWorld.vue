<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router'
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'

    defineProps<{ msg: string }>()

    const route=useRoute()
    
    const count = ref(0)

    const count2 = reactive({tex:"989"})

    onMounted(()=>{
    console.log('init mounted...')
    })

    onMounted(()=>{
      console.log('init mounted...')
      
    })
    //副作用监听
    const asyncPrint =  watchEffect(() => {
      console.log('user input: ', count2.tex)
    });
    
    //指定值监听
    watch(count,(newValue, oldValue)=>{
      console.log(`原值为${newValue}`)
      console.log(`新值为${oldValue}`)
    });

    setTimeout(() => {
        asyncPrint();
      }, 6000)

</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <el-button>Default</el-button>
  <div>
    路由{{route.query.test}}
  </div>
</template>

<style lang="scss" scoped>
// 全局变量 / globalVar.scss
$font-size-normal: 32px;
$bg-color: #fa197e;
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color:$bg-color;
}
</style>