<template>
  <div>
    {{name}}
    {{tes.text}}
  </div>
</template>

<script setup lang="ts">
  import { reactiveOmit } from '@vueuse/shared';
import { reactive, ref } from 'vue'
  defineProps<{ msg?: string }>()
  const name=ref("黄玉超")
  const tes=reactive({text:name})
</script>

<style lang="scss" scoped>

</style>
