<template>
  <div class="layouts-wrap">
    <div class="layouts-wrap-nav-bar">
      <div class="layouts-wrap-nav-logo"></div>
      <div class="layouts-wrap-nav-menus">
        <MenuList />
      </div>
      <div class="layouts-wrap-nav-user">
        <a-popover trigger="click">
          <a-button>Click Me</a-button>
          <template #content>
            <p>Here is the text content</p>
            <p>Here is the text content</p>
          </template>
        </a-popover>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import MenuList from './components/navMenus/index.vue';
import { useRouter } from 'vue-router';
const route = useRouter();
console.log(route)
</script>

<style lang="less">
.layouts-wrap {
  width: 100vw;

  .layouts-wrap-nav-bar {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(var(--primary-6));
    padding: 0 20px;
    box-sizing: border-box;

    .layouts-wrap-nav-logo {
      width: 200px;
      height: 30px;
      background-color: rgb(var(--arcoblue-1));
      border-radius: var(--border-radius-small);
    }

    .layouts-wrap-nav-menus {
      flex: 1;
      justify-content: center;
    }
  }
}
</style>
