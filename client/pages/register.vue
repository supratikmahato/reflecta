<template>
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
      <h1
        v-for="error in errors"
        :key="error"
        class="alert alert-error p-2 shadow-md"
      >
        {{ error }}
      </h1>
    </div>
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
              <input
                v-model.trim="form.password"
                type="password"
                placeholder="password"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary normal-case">
                Register
              </button>
            </div>
            <h1 class="mt-6 font-bold">
              Already have an account? Login
              <NuxtLink class="text-accent underline" to="/login">here</NuxtLink
              >.
            </h1>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Joi from "joi";
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
});

definePageMeta({
  middleware: "if-auth",
});

const config = useRuntimeConfig();

const form = ref({
  username: "",
  email: "",
  password: "",
});
const errors = ref([]);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    const value = await schema.validateAsync(form.value);
    await useAsyncData(
      () =>
        $fetch(`${config.baseUrl}/auth/register`, {
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
          }),
      {
        initialCache: false,
      }
    );
  } catch (e) {
    errors.value = e.details.map((e) => e.message);
  }
  loading.value = false;
}
</script>
