<template>
  <a
    href="#"
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
    @click="showModal"
    >Watch</a
  >
  <Modal v-if="isShowWatchModal" @close="closeModal" size="xs">
    <template #header>
      <div class="flex items-center text-lg">Info</div>
    </template>
    <template #body>
      <div class="space-y-3">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          First Name: {{ clientInfo.first_name }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Last Name: {{ clientInfo.last_name }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Email: {{ clientInfo.email }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Address: {{ clientInfo.address }}
        </p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Phone Number: {{ clientInfo.phone_number }}
        </p>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Modal } from "flowbite-vue";
import { useStore } from "../../store/store";

interface Props {
  clientId: number;
}

const store = useStore();

const props = defineProps<Props>();
const isShowWatchModal = ref(false);

const clientInfo = computed(() => store.getters.getClientById(props.clientId));

function showModal() {
  isShowWatchModal.value = true;
}

function closeModal() {
  isShowWatchModal.value = false;
}
</script>
