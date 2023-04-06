<template>
  <div class="layouts-wrap">
    <div class="layouts-wrap-nav-bar">
      <div class="layouts-wrap-nav-logo"></div>

      <div class="layouts-wrap-nav-menus">
        <navMenuList />
      </div>

      <div class="layouts-wrap-nav-user">
        <a-popover trigger="click">
          <p class="layouts-wrap-nav-user-name">
            {{ userName }}
            <icon-down />
          </p>
          <template #content>
            <p class="layouts-wrap-popover-item" @click="handleOpenUser">
              个人中心
            </p>
            <p class="layouts-wrap-popover-item" @click="handleLogout">
              退出登录
            </p>
          </template>
        </a-popover>
      </div>
    </div>

    <div class="layouts-view-wrap">
      <div v-if="navMenuKey === '1'" class="layouts-left-menus">
        <leftMenuList :left-menus="leftMenus" />
      </div>

      <div class="layouts-content">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import navMenuList from './components/navMenus/index.vue';
import leftMenuList from './components/leftMenus/index.vue';
import { IconDown } from '@arco-design/web-vue/es/icon';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import type { Imeus } from '../../store/user';
import { ref, watch, toRaw, Ref, computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const navMenuKey = ref('');
const leftMenus: Ref<Imeus[]> = ref([]);
const userName = computed(() => userStore.name);

// 获取子级路由
const getLeftMenus = (key: string) => {
  const menuList = toRaw(userStore.menus);
  const menuItem = menuList.find((item: Imeus) => item.key === key);
  if (menuItem && menuItem.children) {
    leftMenus.value = menuItem.children;
  }
};

// 打开个人中心
const handleOpenUser = () => {
  console.log('打开个人中心');
};

// 退出登录
const handleLogout = () => {
  userStore._GetLogout();
  router.push('/login');
};

// 监听navMenu中的路由变化
watch(
  () => userStore.menusItem,
  (newValue) => {
    if (newValue.key === '1') {
      getLeftMenus(newValue.key);
    }
    navMenuKey.value = newValue.key;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
.layouts-wrap {
  width: 100vw;

  .layouts-wrap-nav-bar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: rgb(var(--primary-6));
    padding: 0 20px;
    box-sizing: border-box;

    .layouts-wrap-nav-logo {
      width: 200px;
      height: 30px;
      background-color: var(--color-bg-1);
      border-radius: var(--border-radius-small);
    }

    .layouts-wrap-nav-user {
      cursor: pointer;
      .layouts-wrap-nav-user-name {
        color: var(--color-bg-1);
      }
    }

    .layouts-wrap-nav-menus {
      position: relative;
      width: 500px;
      margin: 0 auto;
      height: 52px;
    }
  }

  .layouts-view-wrap {
    display: flex;
    .layouts-content {
      padding: 20px;
      flex: 1;
    }
  }
}
.layouts-wrap-popover-item:hover {
  cursor: pointer;
}
</style>
