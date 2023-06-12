
<script setup lang="ts">
import { computed, ref } from "vue";
import { Modal } from "flowbite-vue";
import { useStore } from "../../store/store";

interface Props {
  userId: number;
}

const props = defineProps<Props>();

const store = useStore();

const isShowWatchModal = ref(false);

const userInfo = computed(() => store.getters.getUserById(props.userId));

function showModal() {
  isShowWatchModal.value = true;
}

function closeModal() {
  isShowWatchModal.value = false;
}
</script>

<template>
  <a
    href="#"
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
    @click="showModal"
    >Watch</a
  >
  <Modal v-if="isShowWatchModal" @close="closeModal" size="xs">
    <template #header>
      <div class="flex items-center text-lg text-gray-900 dark:text-white">Info</div>
    </template>
    <template #body>
      <div class="space-y-3">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          First Name: {{ userInfo.first_name }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Last Name: {{ userInfo.last_name }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Email: {{ userInfo.email }}
        </p>
      </div>
    </template>
  </Modal>
</template>
