<template>
  <div class="layouts-wrap">
    <div class="layouts-wrap-left-menus">
      <leftMenus/>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import leftMenus from './components/leftMenus/index.vue';
import { useRouter } from 'vue-router';
const route = useRouter();
console.log(route)
</script>

<style lang="less">
  .layouts-wrap{
    display: flex;
    .layouts-wrap-left-menus{
      height: 100vh;
      width: 200px;
    }
  }
</style>
