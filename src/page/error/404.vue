<template>
  <div class="error-404">
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  defineProps<{ msg: string }>()
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
}
</style>
