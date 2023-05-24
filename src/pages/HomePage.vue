<template>
  <side-bar><router-view></router-view></side-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { authApi } from "../services/auth-api";

import SideBar from "../components/core/SideBar.vue";
import { onMounted } from "vue";
import { useStore } from "../store/store";

const router = useRouter();
const store = useStore();

onMounted(async () => {
  await authApi
    .auth()
    .then((res) => {
      store.commit("setAuth", res.data);
    })
    .catch((err) => {
      router.push("/login");
    });
});

</script>
