<script setup lang="ts">
import { helpers, email as Email, required } from "@vuelidate/validators";
import { inject, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";
import { useStore } from "../../store/store";
import useVuelidate from "@vuelidate/core";
import { useToast } from "vue-toastification";
import { instance } from "../../services/axios";

const router = useRouter();
const email = ref("");
const password = ref("");
const store = useStore();
const $cookies = inject<VueCookies>("$cookies");
const toast = useToast();

const rules = {
  email: {
    required: helpers.withMessage("Please Enter a valid email", Email),
  },
  password: {
    required: helpers.withMessage("Please Enter a Password", required),
  },
};

const v$ = useVuelidate(rules, {
  email,
  password,
});

async function submitINFO() {
  v$.value.$validate();
  if (!v$.value.$error) {
    await authApi
      .signIn({ email: email.value, password: password.value })
      .then(async (res) => {
        if (!res.data.user.company_id) {
          $cookies?.set("email", email.value);
          $cookies?.set("password", password.value);
          $cookies?.set("id", res.data.user.id);
          store.commit("setAuth", res.data.user);
          router.push("/company-sign-in");
        } else {
          instance.defaults.headers.common["Authorization"] = res.data.token;
          localStorage.setItem("token", res.data.token);
          router.push("/");
        }
        email.value = "";
        password.value = "";
      })
      .catch((err) => {
        if (!err.response) toast.error(`${err.message}`);
        else toast.error(`${err.response.data}`);
      });
  }
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
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </p>
        </div>

        <div>
          <button
            @click="submitINFO"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't Have Account ?
        <a
          href="#"
          @click="router.push('/registration')"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign Up</a
        >
      </p>
    </div>
  </div>
</template>
