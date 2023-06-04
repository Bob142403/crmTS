<template>
  <!-- Modal toggle -->
  <a
    href="#"
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
    @click="showModal"
    >Edit</a
  >
  <Modal v-if="isShowEditModal" @close="closeModal">
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
        @click="EditTask"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save Item
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Modal } from "flowbite-vue";
import { useStore } from "../../store/store";
import { helpers, email as Email, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useUpdateUser } from "../../hooks/api/users/use-update-user";

interface Props {
  userId: number;
}

const store = useStore();

const props = defineProps<Props>();

const user = computed(() => store.getters.getUserById(props.userId));
const isShowEditModal = ref(false);
const first_name = ref(user.value.first_name);
const last_name = ref(user.value.last_name);
const email = ref(user.value.email);
const updateUser = useUpdateUser();

const rules = {
  first_name: {
    required: helpers.withMessage("This field is required", required),
  },
  last_name: {
    required: helpers.withMessage("This field is required", required),
  },
  email: {
    Email: helpers.withMessage("Please enter a valid email", Email),
    required: helpers.withMessage("This field is required", required),
  },
};
const v$ = useVuelidate(rules, {
  first_name,
  last_name,
  email,
});

function closeModal() {
  isShowEditModal.value = false;
}
function showModal() {
  isShowEditModal.value = true;
}

async function EditTask() {
  v$.value.$validate();

  const obj = {
    first_name: first_name.value,
    last_name: last_name.value,
    id: props.userId,
    email: email.value,
  };
  if (!v$.value.$error) {
    await updateUser(props.userId, obj);

    closeModal();
  }
}
</script>
