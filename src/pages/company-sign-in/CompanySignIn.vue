<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { inject, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";
import { instance } from "../../services/axios";
import { companyApi } from "../../services/company-api";

const company = ref("");
const router = useRouter();

const $cookies = inject<VueCookies>("$cookies");
const email = $cookies?.get("email");
const password = $cookies?.get("password");
const id = $cookies?.get("id");

const rules = {
  company: {
    required: helpers.withMessage("This field is required", required),
  },
};

const v$ = useVuelidate(rules, { company });

async function submitINFO() {
  v$.value.$validate();

  let company_id,
    role = "user";

  await companyApi.createCompany({ name: company.value }).then((res) => {
    role = res.data.role;
    company_id = res.data.id;
  });
  await authApi.chooseCompany(id, {
    company_id: company_id,
    role,
  });
  await authApi
    .signIn({
      email,
      password,
    })
    .then(async (res) => {
      instance.defaults.headers.common["Authorization"] = res.data.token;
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
      <form class="space-y-6" @submit.prevent>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.company.$error">{{
              v$.company.$errors[0].$message
            }}</span>
          </p>
        </div>

        <div>
          <button
            @click="submitINFO"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
