import { createRouter, createWebHistory } from "vue-router";
import ClientPage from "../pages/clients/ClientPage.vue";
import UsersPage from "../pages/users/UsersPage.vue";
import SignInPage from "../pages/sign-in/SignInPage.vue";
import HomePage from "../pages/HomePage.vue";
import SignUpPage from "../pages/sign-up/SignUpPage.vue";
import { authApi } from "../services/auth-api";

const routes = [
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "/clients",
        component: ClientPage,
      },
      {
        path: "/users",
        component: UsersPage,
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: SignInPage,
  },
  {
    name: "sign-up",
    path: "/registration",
    component: SignUpPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
