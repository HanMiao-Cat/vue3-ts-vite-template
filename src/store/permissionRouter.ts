import { defineStore } from "pinia";
import Layouts from "../components/layouts/Layouts.vue";
import router from "../router/index";

export const usePermissionRouter = defineStore("permissionRouter", {
  state: () => ({
    arr: [] as any
  }),
  actions: {
    
    _GenerateRoutes(menus: any[]) {
      menus.forEach((item: any) => {
        const route = {
          path: `${item.path}`,
          name: item.name,
          component: () => import(`/src${item.component}`),
        };
        console.log(route);
        if(item.children && item.children.length) {
          this._GenerateRoutes(item.children);
        }

        this.arr.push(route);
      });
      return this.arr;
    },
  },
});
