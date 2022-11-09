<template>
  <div class="left-menus-wrap" :class="{ 'packUpMenus': collapsed }">
    <div class="menus-top-wrap">
      <a-button
      type="primary"
      @click="toggleCollapse"
      size="mini"
    >
      <icon-menu-unfold v-if="collapsed" />
      <icon-menu-fold v-else />
    </a-button>
    <p class="menus-top_text">{{ userStore.menusItem.name }}</p>
    </div>
    
    <a-menu v-model:selected-keys="activeLeftMenus">
      <a-menu-item v-for="item in leftMenus" :key="item.key" @click="handleCutMenu(item)">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue';
import type { Imeus } from "../../../../store/user";
import { useUserStore } from "../../../../store/user";
import { IconMenuUnfold, IconMenuFold } from "@arco-design/web-vue/es/icon";
import router from '../../../../router';
const userStore = useUserStore();
const props = defineProps<{
  leftMenus: Imeus[];
}>();

const activeLeftMenus: Ref<string[]> = ref([]);
const collapsed = ref(false);

onMounted(() => {
  props.leftMenus.forEach(item => {
    const { path } = item;
    if(path === userStore.menusItem.redirect) {
      activeLeftMenus.value = [item.key];
    }
  })
})

// 展开 ｜ 收起
const toggleCollapse = () => {
  collapsed.value =! collapsed.value
}

// 切换路由
const handleCutMenu = (menu: Imeus) => {
  router.push(menu.path);
}
</script>

<style scoped lang="less">
  .left-menus-wrap{
    width: 240px;
    height: calc(100vh - 52px);
    border-right: var(--color-neutral-2) 2px solid;
    transition: width .36s ease;
    overflow: hidden;
    .menus-top-wrap{
      padding: 8px;
      box-sizing: border-box;
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      border-bottom: var(--color-neutral-3) 1px solid;
      background-color: #fafbfc;
      .menus-top_text{
        color: var(--color-neutral-10);
        font-weight: 600;
        padding-left: 12px;
      }
    }
    :deep(.arco-menu){
      border-radius: 0px !important;
      background-color: #fafbfc;
      height: calc(100vh - 52px - 52px);
      .arco-menu-inner {
        padding: 8px;
        .arco-menu-item{
          border-radius: 4px;
          background-color: #fafbfc;
        }
        .arco-menu-selected{
          background-color: #ebecf0;
        }
        .arco-menu-item:hover{
          background-color: #ebecf0;
        }
      }
    }
  }

  .packUpMenus{
    width: 54px;
  }
</style>