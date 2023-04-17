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
            <th scope="col" class="px-6 py-3">First Name</th>
            <th scope="col" class="px-6 py-3">Last Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Adress</th>
            <th scope="col" class="px-6 py-3">Phone Number</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="arr in data"
            :key="arr.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ arr["first_name"] }}
            </th>

            <td class="px-6 py-4">{{ arr["last_name"] }}</td>
            <td class="px-6 py-4">{{ arr["email"] }}</td>
            <td class="px-6 py-4">{{ arr["address"] }}</td>
            <td class="px-6 py-4">{{ arr["phone_number"] }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <EditModal :clientId="arr.id" />
                <DeleteModal :clientId="arr.id" />
                <WatchModal :clientId="arr.id" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateModal from "../../components/clients/CreateModal.vue";
import EditModal from "../../components/clients/EditModal.vue";
import DeleteModal from "../../components/clients/DeleteModal.vue";
import WatchModal from "../../components/clients/WatchModal.vue";
import { computed } from "vue";
import { useStore } from "../../store/store";

const store = useStore();

store.dispatch("fetchData");

const data = computed(() => store.getters.getClients);
</script>

<style></style>
