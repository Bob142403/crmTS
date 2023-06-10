import { createRouter, createWebHistory } from "vue-router";
import ClientPage from "../pages/clients/ClientPage.vue";
import UsersPage from "../pages/users/UsersPage.vue";
import SignInPage from "../pages/sign-in/SignInPage.vue";
import HomePage from "../pages/HomePage.vue";
import SignUpPage from "../pages/sign-up/SignUpPage.vue";
import CompanyPageVue from "../pages/company/CompanyPage.vue";
import CompanySignIn from "../pages/company-sign-in/CompanySignIn.vue";

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
      {
        path: "/companies",
        component: CompanyPageVue,
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
  {
    path: "/company-sign-in",
    component: CompanySignIn,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
