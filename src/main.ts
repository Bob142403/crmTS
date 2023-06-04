import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { key, store } from "./store/store.js";
import { router } from "./routes";
import VueCookies from "vue-cookies";
import Notifications from "@kyvg/vue3-notification";

createApp(App)
  .use(store, key)
  .use(router)
  .use(VueCookies, { expires: "7d" })
  .use(Notifications)
  .mount("#app");
