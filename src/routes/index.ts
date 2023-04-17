import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import ClientPage from "../pages/clients/ClientPage.vue";

const routes = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/clients",
    component: ClientPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
