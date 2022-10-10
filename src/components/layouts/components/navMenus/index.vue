<template>
  <div class="menu-list">
    <a-menu mode="horizontal" :default-selected-keys="['0']">
      <a-menu-item class="menu-item" v-for="(item, index) in menus" :key="item.key" @click="handleMenus(item)">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../../store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const menus = userStore.menus;
console.log(menus)
const handleMenus = (item) => {
  console.log(item)
  router.push(item.path);
}
</script>

<style scoped lang="less">
  /deep/ .arco-menu-inner{
    background-color: rgb(var(--primary-6));
    .arco-menu-overflow-wrap{
      display: flex;
      justify-content: center;
    }
  }
</style>
