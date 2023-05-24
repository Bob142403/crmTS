<template>
  <side-bar><router-view></router-view></side-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { authApi } from "../services/auth-api";

import SideBar from "../components/core/SideBar.vue";

const router = useRouter();
</script>
