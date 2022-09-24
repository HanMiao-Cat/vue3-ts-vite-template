<template>
  <div class="menu-list">
    <a-menu mode="horizontal" :default-selected-keys="['0']" @menu-item-click="handleMenuChange">
      <a-menu-item class="menu-item" v-for="(item, index) in menus" :key="index + ''">{{ item.name }}</a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from "vue";
import { useUserStore } from "../../../../store/user";

const userStore = useUserStore();
const menus = toRaw(userStore.menus);
const handleMenuChange = (e: string):void => {
  
}
</script>

<style scoped lang="less">
  /deep/ .arco-menu-inner{
    background-color: rgb(var(--primary-6));
  }
</style>
