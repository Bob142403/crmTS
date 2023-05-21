<template>
  <side-bar><router-view></router-view></side-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import SideBar from "../components/core/SideBar.vue";
import { usersApi } from "../services/users-api";

const router = useRouter();

usersApi.getUsers().catch((res) => {
  router.push("/login");
});
</script>
