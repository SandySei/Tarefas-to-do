// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLogin.vue"),
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
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultHome.vue"),
    children: [
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
        path: "/addListItem/:id",
        name: "addListItem",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/addListItem.vue"),
      },
      {
        path: "/viewItemList/:id",
        name: "viewItemList",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/viewListItem.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
