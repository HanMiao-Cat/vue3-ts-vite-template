<template>
  <div class="menu-list">
    <a-menu
      :style="{ width: '200px', borderRadius: '4px' }"
      theme="dark"
      :collapsed="collapsed"
      :default-open-keys="['0']"
      breakpoint="xl"
      :default-selected-keys="['0_2']"
    >
      <template v-for="(item, index) in menus" :key="index + ''">
        <template v-if="item.children && item.children.length">
          <a-sub-menu :key="index + ''">
            <template #title>{{ item.name }}</template>
            <a-menu-item
              :class="[ active === item.name? 'item-active': '' ]"
              v-for="(childrenItem, childrenIndex) in item.children"
              :key="childrenIndex + ''"
              @click="handleChangeMenu(childrenItem)"
            >
              {{ childrenItem.name }}
            </a-menu-item>
          </a-sub-menu>
        </template>

        <template v-else>
          <a-menu-item
            @click="handleChangeMenu(item)"
            :key="index + ''"
            :class="[ active === item.name? 'item-active': '' ]"
            >{{ item.name }}</a-menu-item
          >
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../../../store/user";

const active = ref("Home");
const userStore = useUserStore();
const router = useRouter();
const menus = toRaw(userStore.menus);
console.log(menus);
const handleChangeMenu = (item: any) => {
  active.value = item.name;
  console.log(active.value);
  router.push(item.path);
};

const collapsed = ref(false);
</script>

<style scoped lang="less">
.menu-list {
  box-sizing: border-box;
  height: 100%;
  background-color: var(--color-neutral-2);
  overflow: hidden;
  // .item-active {
  //   color: #fff;
  // }
}
</style>
