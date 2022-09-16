import type { Router } from "vue-router";
import storage from "store";
import NProgress from "nprogress";
import { useUserStore } from "../store/user";
const whiteList = ["Login"];
const defaultPath = "/home";

const permission = (router: Router) => {
  router.beforeEach((to, from, next) => {
    console.log(to);
    NProgress.start();
    const token = storage.get("token");
    const isWhite = whiteList.includes(to.name as string);
    if (token) {
      if (to.path === "/login") {
        next({ path: defaultPath });
      } else {
        const userStore = useUserStore();
        if (userStore.loadRouter) {
          next();
        } else {
          userStore._GetMenus();
          next({ ...to, replace: true });
        }
      }
    } else {
      if (isWhite) {
        next();
      } else {
        next({ path: "/login" });
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};

export default permission;
