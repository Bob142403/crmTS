<script setup lang="ts">
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();

notification.notify({
  title: "Vue 3 notification 🎉",
});
</script>

<template>
  <router-view></router-view>
  <notifications />
</template>
