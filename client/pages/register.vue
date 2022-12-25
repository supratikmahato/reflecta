<template>
  <div>
    <div
      class="hero min-h-screen flex flex-col gap-y-6 justify-center items-center bg-base-200 p-5"
    >
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        Register.
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
                  <span class="label-text font-bold">Username</span>
                </label>
                <input
                  v-model.trim="form.username"
                  type="text"
                  placeholder="username"
                  class="input input-bordered"
                  required
                />
              </div>
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
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-bold">Confirm Password</span>
                </label>
                <div class="flex flex-row justify-end gap-x-4">
                  <input
                    v-if="!showConfirmPassword"
                    v-model.trim="form.confirmPassword"
                    type="password"
                    placeholder="confirm password"
                    class="input input-bordered w-full"
                    required
                  />
                  <input
                    v-else
                    v-model.trim="form.confirmPassword"
                    type="text"
                    placeholder="password"
                    class="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click.prevent="toggleConfirmPassword"
                  >
                    <i
                      v-if="!showConfirmPassword"
                      class="bx bx-show text-xl"
                    ></i>
                    <i v-else class="bx bx-hide text-xl"></i>
                  </button>
                </div>
              </div>
              <div class="form-control mt-6">
                <button type="submit" class="btn btn-primary normal-case">
                  Register
                </button>
              </div>
              <h1 class="mt-6 font-bold">
                Already have an account? Login
                <NuxtLink class="text-accent underline" to="/login"
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
  username: Joi.string().required().trim().label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().min(6).trim().label("Password"),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .trim()
    .valid(Joi.ref("password"))
    .label("Confirm Password"),
});

definePageMeta({
  middleware: "if-auth",
});

const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const errors = ref<string[]>([]);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    const value = await schema.validateAsync(form.value);
    await useAsyncData("register", () =>
      useExtendedFetch("/auth/register", {
        method: "POST",
        credentials: "include",
        body: value,
      })
        .then(() => {
          errors.value = [];
          navigateTo("/login");
        })
        .catch((e: IError) => {
          if (e.data.error && e.data.success === false) {
            errors.value = [e.data.error];
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

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}
</script>
