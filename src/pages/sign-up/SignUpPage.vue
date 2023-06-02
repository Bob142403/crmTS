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
        Registration
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-4"
        action="#"
        method="POST"
        @submit.prevent="addUser"
      >
        <div>
          <label
            for="first_name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-2">
            <input
              id="first_name"
              v-model="first_name"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="last_name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >
          <div class="mt-2">
            <input
              id="last_name"
              type="text"
              v-model="last_name"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
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
        </div>

        <div>
          <label
            for="confirm_password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              v-model="confirm_password"
              autocomplete="current-password"
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
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../../services/auth-api";
// import { useVuelidate } from "@vuelidate/core";
// import {
//   required,
//   helpers,
//   email as Email,
//   sameAs,
// } from "@vuelidate/validators";

const router = useRouter();
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");

// const rules = {
//   first_name: {
//     required: helpers.withMessage("Это поле Обязательно !", required),
//   },
//   last_name: {
//     required: helpers.withMessage("Это поле Обязательно !", required),
//   },
//   email: {
//     required: helpers.withMessage("Неправильная Почта !", Email),
//   },
//   password: {
//     required: helpers.withMessage("Это поле Обязательно !", required),
//   },
//   confirm_password: {
//     sameAs: sameAs(password.value),
//   },
// };

// const v$ = useVuelidate(rules, {
//   first_name,
//   last_name,
//   email,
//   password,
//   confirm_password,
// });

async function addUser() {
  // v$.value.$validate();
  // console.log(v$.value);
  const user = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value,
  };
  if (confirm_password.value === password.value) {
    await authApi
      .signUp(user)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
