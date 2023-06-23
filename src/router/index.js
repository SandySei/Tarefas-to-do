// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/inicial",
    name: "Inicial",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/Inicial.vue"),
  },
  {
    path: "/addItem",
    name: "addItem",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/addItem.vue"),
  },
  {
    path: "/viewItem/:id",
    name: "viewItem",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/viewItem.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/cadastro",
        name: "Cadastro",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Cadastro.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
