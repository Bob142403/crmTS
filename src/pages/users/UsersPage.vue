<script setup lang="ts">
import CreateModal from "../../components/users/CreateModal.vue";
import EditModal from "../../components/users/EditModal.vue";
import DeleteModal from "../../components/users/DeleteModal.vue";
import WatchModal from "../../components/users/WatchModal.vue";

import { computed, onMounted } from "vue";
import { useStore } from "../../store/store";
import { usersApi } from "../../services/users-api";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";

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

  await usersApi
    .getUsers()
    .then((res) => {
      store.commit("setUsers", res.data);
    })
    .catch((err) => {
      router.push("/login");
    });
});

const auth = computed(() => store.state.authModule.auth);

const users = computed(() => {
  return store.state.usersModule.users;
});
</script>

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
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            :v-if="user.id != auth.id"
            class="bg-white border-b dark:bg-gray-900 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ user["first_name"] }}
            </th>

            <td class="px-6 py-4">{{ user["last_name"] }}</td>
            <td class="px-6 py-4">{{ user["email"] }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <EditModal :userId="user.id" />
                <DeleteModal :userId="user.id" />
                <WatchModal :userId="user.id" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
