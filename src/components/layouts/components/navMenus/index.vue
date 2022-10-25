<template>
  <div class="menu-nav">
    <a-menu mode="horizontal" v-model:selected-keys="activeKeys">
      <a-menu-item
        class="menu-item"
        v-for="item in menus"
        :key="item.key"
        @click="handleMenus(item)"
      >
        <component :is="item.icon" />
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { IconApps, IconRobot } from "@arco-design/web-vue/es/icon";
import { useUserStore } from "../../../../store/user";
import type { Imeus } from "../../../../store/user";
import { useRoute, useRouter } from "vue-router";
import { ref, Ref, computed, toRaw, watch } from "vue";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const activeKeys: Ref<string[]> = ref([]);

// 获取路由
const menus = computed(() => {
  const arrIcon = [IconApps, IconRobot];
  const menusList: Imeus[] = toRaw(userStore.menus);
  const menus: Imeus[] = [];
  for (let i = 0; i < menusList.length; i++) {
    const index = arrIcon.findIndex((item) => item.name === menusList[i].icon);
    if (index !== -1) {
      menusList[i].icon = arrIcon[index];
    }
    menus.push(menusList[i]);
  }
  return menus;
});

// 跳转路由
const handleMenus = (item: Imeus): void => {
  if (item.redirect) {
    router.push(item.redirect);
  }
};

// 监听路由变化
watch(
  () => route.path,
  (newValue) => {
    const menusList = toRaw(userStore.menus);
    const menuItem = menusList.find(item => item.redirect === newValue);
    if(menuItem) {
      activeKeys.value = [menuItem.key];
      userStore.menusItem = menuItem;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="less">
.menu-nav {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 500px;
  height: 100%;
  margin: 0 auto;

  :deep(.arco-menu) {
    background-color: transparent;

    .arco-menu-inner {
      padding-top: 11px;
      padding-bottom: 11px;

      .arco-menu-item {
        background-color: transparent;
        color: var(--color-white);
        transition: all 0.3s;

        .arco-icon {
          margin-right: 8px;
          font-size: 18px;
          color: var(--color-white);
          vertical-align: -4px;
        }

        &.arco-menu-selected,
        &:hover {
          background-color: rgb(var(--primary-4));
        }
      }

      .arco-menu-selected-label {
        bottom: -8px;
        background-color: transparent;
      }

      .arco-menu-pop {
        &::after {
          content: none;
        }

        &.arco-menu-selected {
          background-color: var(--color-fill-2);
        }
      }
    }
  }
}
</style>
