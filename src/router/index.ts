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
    component: () => import("../components/layouts/Layouts.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

permission(router);

export default router;
