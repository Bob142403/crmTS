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
import { useRouter } from "vue-router";
import { companyApi } from "../../services/company-api";
import { helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useToast } from "vue-toastification";

interface Props {
  companyId: number;
}

const store = useStore();
const router = useRouter();

const props = defineProps<Props>();

const company = computed(() => store.getters.getCompanyById(props.companyId));
const isShowEditModal = ref(false);
const name = ref(company.value.name);
const toast = useToast();

const rules = {
  name: {
    required: helpers.withMessage("This field is required", required),
  },
};

const v$ = useVuelidate(rules, {
  name,
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
    name: name.value,
    id: props.companyId,
  };
  if (!v$.value.$error) {
    companyApi
      .changeCompanyById(props.companyId, obj)
      .then(() => {
        toast("Company Updated");
        store.commit("updateCompanyById", obj);
      })
      .catch((err) => router.push("/login"));
    closeModal();
  }
}
</script>
