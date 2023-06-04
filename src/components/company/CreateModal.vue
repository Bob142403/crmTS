<template>
  <button
    @click="showModal"
    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
  >
    Add Company
  </button>
  <Modal v-if="isShowCreateModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Modal</div>
    </template>
    <template #body>
      <div class="space-y-6">
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            name="Name"
            v-model="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
      </div>
    </template>
    <template #footer>
      <button
        @click="AddCompany"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Company
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Modal } from "flowbite-vue";
import CreateCompany from "../../types/CreateCompany";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useCreateCompany } from "../../hooks/api/company/use-create-company";

function closeModal() {
  isShowCreateModal.value = false;
  name.value = "";
}
function showModal() {
  isShowCreateModal.value = true;
}

const isShowCreateModal = ref(false);
const name = ref("");
const createCompany = useCreateCompany();

const rules = {
  name: {
    required: helpers.withMessage("This field is required", required),
  },
};

const v$ = useVuelidate(rules, {
  name,
});

async function AddCompany() {
  v$.value.$validate();

  const company: CreateCompany = {
    name: name.value,
  };
  if (!v$.value.$error) {
    await createCompany(company);

    name.value = "";
    closeModal();
  }
}
</script>
