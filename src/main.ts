import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { key, store } from "./store/store.js";
import { router } from "./routes";
import VueCookies from "vue-cookies";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
  position: POSITION.BOTTOM_RIGHT,
  pauseOnHover: false,
  timeout: 2000,
};

createApp(App)
  .use(store, key)
  .use(router)
  .use(VueCookies, { expires: "7d" })
  .use(Toast, options)
  .mount("#app");
