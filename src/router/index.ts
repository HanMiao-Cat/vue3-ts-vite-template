import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import permission from "./permission";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name:'app',
    redirect: "/layouts",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../view/login/Login.vue"),
  },
  {
    path: "/layouts",
    name: "Layouts",
    redirect: "/home",
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("../view/home/Home.vue"),
      // },
      // {
      //   path: "/goods",
      //   name: "goods",
      //   component: () => import("../view/goods/Goods.vue"),
      // },
    ],
    component: () => import("../components/layouts/Layouts.vue"),
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("../view/notFound/NotFound.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

permission(router);

export default router;
