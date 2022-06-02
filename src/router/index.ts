import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/example",
    name: "example",
    component: () => import("@/components/TestExample.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/components/TestError.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
