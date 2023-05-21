<template>
  <button
    @click="showModal"
    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  >
    Add Task
  </button>
  <Modal v-if="isShowCreateModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Modal</div>
    </template>
    <template #body>
      <div class="space-y-6">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >First Name</label
          >
          <input
            name="First Name"
            v-model="first_name"
            id="first_name"
            placeholder="Bob"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            for="last_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Last Name</label
          >
          <input
            name="Last Name"
            id="last_name"
            v-model="last_name"
            placeholder="Mahmudzoda"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your Email</label
          >
          <input
            type="email"
            name="email"
            v-model="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
      </div>
    </template>
    <template #footer>
      <button
        @click="AddItem"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Item
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Modal } from "flowbite-vue";
import { useStore } from "../../store/store";
import { usersApi } from "../../services/users-api";
import CreateUser from "../../types/CreateUser";
import { useRouter } from "vue-router";

function closeModal() {
  isShowCreateModal.value = false;
  ClearAll();
}
function showModal() {
  isShowCreateModal.value = true;
}

const isShowCreateModal = ref(false);
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const store = useStore();
const router = useRouter();

function ClearAll() {
  first_name.value = "";
  last_name.value = "";
  email.value = "";
}

async function AddItem() {
  const user: CreateUser = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
  };
  if (first_name.value && last_name.value && email.value) {
    await usersApi
      .addUser(user)
      .then(() => store.dispatch("fetchUsers"))
      .catch((err) => router.push("/login"));
    closeModal();
  }
}
</script>
