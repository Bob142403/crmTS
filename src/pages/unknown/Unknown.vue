<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";
import { companyApi } from "../../services/company-api";
import { usersApi } from "../../services/users-api";

const company = ref("");
const router = useRouter();

const $cookies = inject<VueCookies>("$cookies");
const email = $cookies?.get("email");
const password = $cookies?.get("password");
const id = $cookies?.get("id");

async function submitINFO() {
  await companyApi.addCompany({ name: company.value });
  await authApi.chooseCompany(id, {
    company_id: company.value,
  });
  await authApi
    .signIn({
      email,
      password,
    })
    .then(async (res) => {
      localStorage.setItem("token", res.data.token);
      router.push("/");
      company.value = "";
    });
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Choose Company
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="submitINFO"
      >
        <div>
          <label
            for="company"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Company</label
          >
          <div class="mt-2">
            <input
              id="company"
              name="company"
              type="text"
              v-model.trim="company"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
