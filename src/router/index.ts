import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import permission from "./permission"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
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
