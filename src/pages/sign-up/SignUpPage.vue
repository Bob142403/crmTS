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
      <form class="space-y-3" @submit.prevent>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.first_name.$error">{{
              v$.first_name.$errors[0].$message
            }}</span>
          </p>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.last_name.$error">{{
              v$.last_name.$errors[0].$message
            }}</span>
          </p>
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
              class="block w-full border-0 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.email.$error">{{
              v$.email.$errors[0].$message
            }}</span>
          </p>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.password.$error">{{
              v$.password.$errors[0].$message
            }}</span>
          </p>
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
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            <span class="font-medium" v-if="v$.confirm_password.$error">{{
              v$.confirm_password.$errors[0].$message
            }}</span>
          </p>
        </div>

        <div>
          <button
            @click="addUser"
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
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  email as Email,
  sameAs,
} from "@vuelidate/validators";
import { useToast } from "vue-toastification";

const router = useRouter();
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");
const toast = useToast();

const rules = {
  first_name: {
    required: helpers.withMessage("This field is required", required),
  },
  last_name: {
    required: helpers.withMessage("This field is required", required),
  },
  email: {
    required: helpers.withMessage("Please enter a valid email", Email),
  },
  password: {
    required: helpers.withMessage("This field is required", required),
  },
  confirm_password: {
    sameAs: helpers.withMessage("Passwords must match", sameAs(password)),
  },
};

const v$ = useVuelidate(rules, {
  first_name,
  last_name,
  email,
  password,
  confirm_password,
});

async function addUser() {
  v$.value.$validate();
  const user = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    password: password.value,
  };
  if (!v$.value.$error) {
    await authApi
      .signUp(user)
      .then((res) => {
        if (res.data == "This email is already Excist") toast(res.data);
        else router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
