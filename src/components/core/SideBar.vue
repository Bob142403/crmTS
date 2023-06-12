<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { useRouter } from "vue-router";
import { useStore } from "../../store/store";
import { computed, ref } from "vue";
import { companyApi } from "../../services/company-api";

const router = useRouter();
const store = useStore();
const hlp = ref("");

const userInfo = computed(() => store.state.authModule.auth);
const company = computed(() => {
  companyApi.getCompanyById(userInfo.value.company_id).then((res) => {
    if (res.data) hlp.value = res.data.name;
  });
  return hlp.value;
});

function changeMode() {
  document.getElementById("theme-toggle-dark-icon")?.classList.toggle("hidden");
  document
    .getElementById("theme-toggle-light-icon")
    ?.classList.toggle("hidden");
  if (
    document
      .getElementById("theme-toggle-dark-icon")
      ?.classList.contains("hidden")
  )
    document.documentElement.classList.remove("dark");
  else document.documentElement.classList.add("dark");
}

function signOut() {
  localStorage.setItem("token", "");
  router.push("/login");
  store.commit("signOut");
}
</script>

<template>
  <nav
    class="fixed top-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <a href="https://flowbite.com" class="flex ml-2 md:mr-24">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="FlowBite Logo"
            />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >Flowbite</span
            >
          </a>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <button
              id="theme-toggle"
              type="button"
              @click="changeMode"
              class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                id="theme-toggle-dark-icon"
                class="hidden w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                ></path>
              </svg>
              <svg
                id="theme-toggle-light-icon"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">Open user menu</span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white rounded-full"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </MenuButton>
              </div>
              <transition
                enter-from-class="transform opacity-0 scale-95"
                enter-active-class="transition ease-out duration-100"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="dark:bg-gray-700 dark:divide-gray-600 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem :disabled="true">
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {{ userInfo.first_name + " " + userInfo.last_name }}
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        Company: {{ company }}
                      </p>
                    </div>
                  </MenuItem>
                  <hr />
                  <MenuItem>
                    <ul class="py-1" role="none">
                      <li>
                        <a
                          @click="signOut"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          role="menuitem"
                          >Sign out</a
                        >
                      </li>
                    </ul>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            href="#"
            @click="router.push('/clients')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              ></path>
            </svg>
            <span class="ml-3">Clients</span>
          </a>
        </li>
        <li v-if="userInfo.role == 'admin' || userInfo.role == 'superadmin'">
          <a
            href="#"
            @click="router.push('/users')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="ml-3">Users</span>
          </a>
        </li>
        <li v-if="userInfo.role == 'superadmin'">
          <a
            href="#"
            @click="router.push('/companies')"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>

            <span class="ml-3">Companies</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <div class="px-4 sm:ml-64 pt-16">
    <slot></slot>
  </div>
</template>
