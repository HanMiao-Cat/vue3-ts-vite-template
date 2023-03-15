import { defineStore } from 'pinia';
const routeAllPathToCompMap = import.meta.glob(`../view/**/*.vue`);
import { Component } from 'vue';
import Layout from '../components/layouts/Layouts.vue';

export const usePermissionRouter = defineStore('permissionRouter', {
  state: () => ({
    arr: [] as any,
  }),
  actions: {
    _GenerateRoutes<T>(menus: T[]): T[] {
      interface IrouterItem {
        path: string;
        name: string;
        component?: Component;
      }

      menus.forEach((item: any) => {
        const route: IrouterItem = {
          path: `${item.path}`,
          name: item.name,
        };
        if (item.component === 'Layouts') {
          route.component = Layout;
        } else {
          route.component =
            routeAllPathToCompMap[
              /* @vite-ignore */ `../view/${item.component}`
            ];
        }

        if (item.children && item.children.length) {
          this._GenerateRoutes(item.children);
        }
        this.arr.push(route);
      });
      return this.arr;
    },
  },
});
