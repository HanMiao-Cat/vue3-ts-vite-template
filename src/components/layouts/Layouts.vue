<template>
  <div class="home-left-menus">
    
    <router-view/>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  const route = useRoute()
  console.log(route)
</script>

<style lang="less">

</style>