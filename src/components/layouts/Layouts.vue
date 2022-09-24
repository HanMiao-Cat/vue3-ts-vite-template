<template>
  <div class="layouts-wrap">
    <div class="layouts-wrap-nav-bar">
      <div class="layouts-wrap-nav-logo"></div>
      <div class="layouts-wrap-nav-menus">
        <leftMenus />
      </div>
      <div class="layouts-wrap-nav-user"></div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import leftMenus from './components/navMenus/index.vue';
import { useRouter } from 'vue-router';
const route = useRouter();
console.log(route)
</script>

<style lang="less">
  .layouts-wrap{
    width: 100vw;
    .layouts-wrap-nav-bar{
      width: 100%;
      display: flex;
      .layouts-wrap-nav-menus{
        flex: 1;
      }
    }
  }
</style>
