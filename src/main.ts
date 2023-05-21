import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { key, store } from "./store/store.js";
import { router } from "./routes";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

createApp(App).use(store, key).use(router).mount("#app");
