<template>
  <CreateModal></CreateModal>
  <div
    class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"
  >
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="company in companies"
            :key="company.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ company["name"] }}
            </th>

            <!-- <td class="px-6 py-4">{{ company["last_name"] }}</td>
            <td class="px-6 py-4">{{ company["email"] }}</td> -->
            <td class="px-6 py-4">
              <div class="flex items-center">
                <EditModal :company-id="company.id" />
                <DeleteModal :company-id="company.id" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateModal from "../../components/company/CreateModal.vue";
import EditModal from "../../components/company/EditModal.vue";
import DeleteModal from "../../components/company/DeleteModal.vue";

import { computed, onMounted } from "vue";
import { useStore } from "../../store/store";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";
import { companyApi } from "../../services/company-api";

const store = useStore();
const router = useRouter();

onMounted(async () => {
  await authApi
    .auth()
    .then((res) => {
      store.commit("setAuth", res.data);
    })
    .catch((err) => {
      router.push("/login");
    });
  await companyApi
    .getCompanes()
    .then((res) => {
    //   store.commit("setUsers", res.data);
    })
    .catch((err) => {
      router.push("/login");
    });
});

const users = computed(() => {
  return store.state.companiesModule.companies;
});
</script>
