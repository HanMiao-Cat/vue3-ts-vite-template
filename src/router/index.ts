import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import permission from "./permission"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../view/login/Login.vue"),
  },
  {
    path: "/",
    name: "Layouts",
    component: () => import("../components/layouts/Layouts.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("../view/home/Home.vue"),
      },
      {
        path: "/goods",
        name: "Goods",
        component: () => import("../view/goods/Goods.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../view/notFound/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

permission(router)

export default router;
