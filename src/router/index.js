// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultLogin.vue"),
    children: [
      {
        path: "/",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/default/DefaultHome.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "/addtask",
        name: "AddTask",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/AddTask.vue"),
      },
      {
        path: "/task/:id",
        name: "Task",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Task.vue"),
      },
      {
        path: "/additem/:id",
        name: "AddItem",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/AddItem.vue"),
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
