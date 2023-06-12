<script setup lang="ts">
import { computed, ref } from "vue";
import { Modal } from "flowbite-vue";
import { useStore } from "../../store/store";
import CreateUser from "../../types/CreateUser";
import { helpers, email as Email, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useCreateUser } from "../../hooks/api/users/use-create-user";

function closeModal() {
  isShowCreateModal.value = false;
  ClearAll();
  v$.value.$reset();
}
function showModal() {
  isShowCreateModal.value = true;
}

const isShowCreateModal = ref(false);
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const role = ref("No Role");
const store = useStore();
const createUser = useCreateUser();

const auth = computed(() => store.state.authModule.auth);

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

function ClearAll() {
  first_name.value = "";
  last_name.value = "";
  email.value = "";
  role.value = "No Role";
}

async function AddUser() {
  v$.value.$validate();

  const user: CreateUser = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    company_id: store.state.authModule.auth.company_id,
    role: role.value,
  };
  if (!v$.value.$error) {
    await createUser(user);

    closeModal();
  }
}
</script>

<template>
  <button
    @click="showModal"
    class="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  >
    Add User
  </button>
  <Modal v-if="isShowCreateModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-gray-900 dark:text-white">
        Modal
      </div>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.first_name.$error">{{
              v$.first_name.$errors[0].$message
            }}</span>
          </p>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.last_name.$error">{{
              v$.last_name.$errors[0].$message
            }}</span>
          </p>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </p>
        </div>
        <div>
          <label
            for="role"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Select role</label
          >
          <select
            id="role"
            v-model="role"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>No Role</option>
            <option value="user">User</option>
            <option
              value="admin"
              v-if="auth.role == 'admin' || auth.role == 'superadmin'"
            >
              Admin
            </option>
            <option value="superadmin" v-if="auth.role == 'superadmin'">
              SuperAdmin
            </option>
          </select>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        @click="AddUser"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add User
      </button>
    </template>
  </Modal>
</template>
