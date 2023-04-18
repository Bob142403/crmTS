import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import ClientPage from "../pages/clients/ClientPage.vue";
import UsersPage from "../pages/users/UsersPage.vue";

const routes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/clients",
    component: ClientPage,
  },
  {
    path: "/users",
    component: UsersPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
