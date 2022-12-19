<template>
  <div>
    <div
      class="hero min-h-screen flex flex-col gap-y-6 justify-center items-center bg-base-200 p-5"
    >
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        Login.
      </h1>
      <div
        v-if="errors.length"
        class="flex flex-col gap-y-1 h-auto text-sm pr-3 pl-3"
      >
        <div
          v-for="error in errors"
          :key="error"
          class="alert alert-error p-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full max-w-sm clay">
          <div class="card-body">
            <form @submit.prevent="submit">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold">Email</span>
                </label>
                <input
                  v-model.trim="form.email"
                  type="text"
                  placeholder="email"
                  class="input input-bordered"
                  required
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold">Password</span>
                </label>
                <div class="flex flex-row justify-end gap-x-4">
                  <input
                    v-if="!showPassword"
                    v-model.trim="form.password"
                    type="password"
                    placeholder="password"
                    class="input input-bordered w-full"
                    required
                  />
                  <input
                    v-else
                    v-model.trim="form.password"
                    type="text"
                    placeholder="password"
                    class="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="togglePassword"
                  >
                    <i v-if="!showPassword" class="bx bx-show text-xl"></i>
                    <i v-else class="bx bx-hide text-xl"></i>
                  </button>
                </div>
              </div>
              <div class="form-control mt-6">
                <button
                  type="submit"
                  class="btn btn-primary normal-case"
                  :class="loading ? 'loading' : ''"
                >
                  Login
                </button>
              </div>
              <h1 class="mt-6 font-bold">
                Don't have an account? Create one
                <NuxtLink class="text-accent underline" to="/register"
                  >here</NuxtLink
                >.
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Joi, { ValidationError } from "joi";
import { FetchError } from "ohmyfetch";

interface IError extends FetchError {
  data: {
    success: boolean;
    error?: string;
    code: number;
  };
}

const schema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().trim().min(6).label("Password"),
});

definePageMeta({
  middleware: "if-auth",
});

const config = useRuntimeConfig();

const form = ref({
  email: "",
  password: "",
});
const showPassword = ref(false);
const errors = ref<string[]>([]);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    const value = await schema.validateAsync(form.value);
    await useAsyncData("login", () =>
      $fetch(`${config.baseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: value,
      })
        .then(() => {
          errors.value = [];
          useCookie("isAuthenticated", {
            path: "/",
            maxAge: 60 * 60 * 24 * 60,
          }).value = "true";
          navigateTo("/");
        })
        .catch((error: IError) => {
          if (error.data.error && error.data.success === false) {
            errors.value = [error.data.error];
          }
        })
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      errors.value = error.details.map((detail) => detail.message);
    } else {
      throw error;
    }
  }
  loading.value = false;
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>
