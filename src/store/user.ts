import { defineStore } from "pinia";
import md5 from "js-md5";
import storage from "store";
import { Message } from "@arco-design/web-vue";
import { usePermissionRouter } from "../store/permissionRouter";
import router from "../router";
import { toRaw } from "vue";

type Imeus = {
  component: string;
  name: string;
  path?: string;
  redirect?: string,
  children?: Imeus[];
};

export const useUserStore = defineStore("userStore", {
  state: () => ({
    token: "",
    name: "",
    menus: [] as Imeus[],
    loadRouter: false,
  }),
  getters: {
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    async _GetLogin(params: Params.Login) {
      return new Promise((reslove, reject) => {
        if (params.name === "admin" && params.passWord === "123456") {
          setTimeout(() => {
            const token = "1231323132";
            this.token = md5(token);
            storage.set("token", this.token);
            reslove('yes');
          }, 1000);
        } else {
          Message.error(`账号或密码错误`);
          reject();
        }
      })
    },

    _GetMenus() {
      return new Promise(async (reslove, reject) => {
        const menus: Array<Imeus> = [
          {
            path: "/system",
            name: "System",
            component: "Layouts",
            redirect: "/home",
            children: [
              {
                path: "/home",
                name: "Home",
                component: "home/Home.vue"
              }
            ] 
          },
          {
            name: "Order",
            component: "Layouts",
            redirect: "/goods",
            children: [{
              path: "/goods",
              name: "Goods",
              component: "goods/Goods.vue",
            }],
          },
        ];
        this.menus = menus;
        const permissionRouter = usePermissionRouter();
        const results = await permissionRouter._GenerateRoutes<Imeus>(menus);
        console.log(results);
        results.forEach((item: any) => {
          const _item = toRaw(item);
          router.addRoute("Layouts", _item);
        });

        router.addRoute({
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          component: () => import("../view/notFound/NotFound.vue"),
        });

        this.loadRouter = true;
        reslove(menus);
      });
    },
  },
});
