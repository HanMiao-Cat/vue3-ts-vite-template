import { defineStore } from "pinia";
const routeAllPathToCompMap = import.meta.glob(`../view/**/*.vue`);

export const usePermissionRouter = defineStore("permissionRouter", {
  state: () => ({
    arr: [] as any
  }),
  actions: {
    _GenerateRoutes<T>(menus: T[]): T[] {
      menus.forEach((item: any) => {
        const route = {
          path: `${item.path}`,
          name: item.name,
          component:  routeAllPathToCompMap[/* @vite-ignore */ `../view/${item.component}`]
        };
      
        if(item.children && item.children.length) {
          this._GenerateRoutes(item.children);
        }
        this.arr.push(route);
      });
      console.log(this.arr);
      return this.arr;
    },
  },
});
