<template>
  <side-bar><router-view></router-view></side-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import SideBar from "../components/core/SideBar.vue";
import { authApi } from "../services/auth-api";

const router = useRouter();

authApi.auth().catch((res) => {
  router.push("/login");
});
</script>
