import { defineStore } from "pinia";
import md5 from "js-md5";
import storage from "store";
import { Message } from "@arco-design/web-vue";
import { usePermissionRouter } from "../store/permissionRouter";
import router from "../router";

type Imeus = {
  component: string;
  name: string;
  path?: string;
  children?: Imeus[];
};

export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: "",
    name: "",
    menus: [] as Imeus[],
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    async _GetLogin(params: Params.Login) {
      if (params.name === "admin" && params.passWord === "123456") {
        setTimeout(() => {
          const token = "1231323132";
          this.token = md5(token);
          storage.set("token", this.token);
        }, 1000);
      } else {
        Message.error(`账号或密码错误`);
      }
    },

    _GetMenus() {
      return new Promise((reslove, reject) => {
        const menus = [
          {
            path: "/home",
            name: "Home",
            component: "/view/home/Home.vue",
            children: [
              {
                path: "/sss",
                name: "Sdskjhd",
                component: "/view/home/Home.vue",
              },
            ],
          },
          {
            path: "/goods",
            name: "Goods",
            component: "/view/goods/Goods.vue",
          },
        ];
        this.menus = menus;
        const permissionRouter = usePermissionRouter();
        const results = permissionRouter._GenerateRoutes(menus);
        results.forEach((item: any) => {
          console.log(item);
          router.addRoute("Layouts", item);
        });
        console.log(router.getRoutes(), "查看现有路由");
        reslove(menus);
      });
    },
  },
});
