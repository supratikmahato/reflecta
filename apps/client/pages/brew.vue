<template>
  <div>
    <div
      class="flex min-h-screen flex-col items-center justify-center gap-y-6 p-4"
    >
      <h1 class="text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
        Brew.
      </h1>
      <div
        v-if="errors.length"
        class="flex h-auto flex-col gap-y-1 pl-3 pr-3 text-sm"
      >
        <div
          v-for="error in errors"
          :key="error"
          class="alert alert-error w-fit p-2 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
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
      <div v-if="success" class="alert alert-success w-fit shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Successfully brewed your mood!</span>
        </div>
      </div>
      <div class="card bg-base-100 w-full max-w-lg flex-shrink-0 shadow-2xl">
        <form @submit.prevent="submit">
          <div class="card-body gap-y-3">
            <div class="form-control">
              <select
                v-model.trim="send.coffeeType"
                class="select-primary select"
                required
              >
                <option disabled selected value="">
                  Express your mood in coffee
                </option>
                <option value="black">Black</option>
                <option value="americano">Americano</option>
                <option value="latte">Latte</option>
                <option value="cappuccino">Cappuccino</option>
                <option value="espresso">Espresso</option>
                <option value="doppio">Doppio</option>
                <option value="cortado">Cortado</option>
                <option value="red-eye">Red Eye</option>
                <option value="galao">Galão</option>
                <option value="lungo">Lungo</option>
                <option value="macchiato">Macchiato</option>
                <option value="mocha">Mocha</option>
                <option value="ristretto">Ristretto</option>
                <option value="flat-white">Flat White</option>
                <option value="affogato">Affogato</option>
                <option value="cafe-au-lait">Café Au Lait</option>
                <option value="irish">Irish</option>
              </select>
            </div>
            <div class="form-control">
              <textarea
                v-model.trim="send.content"
                class="textarea-primary textarea min-h-[10rem] resize-none"
                placeholder="How are you feeling today?"
                required
              ></textarea>
            </div>
            <div class="form-control mt-6">
              <button
                type="submit"
                class="text-md btn-accent btn normal-case sm:text-lg md:text-lg"
                :class="loading ? 'loading' : ''"
              >
                <i class="bx bx-coffee-togo mr-1 text-2xl"></i>Brew Your Mood
                <div class="bg-secondary ml-2 flex rounded-xl p-1">
                  <kbd class="kbd kbd-xs">ctrl</kbd>
                  &nbsp;+&nbsp;
                  <kbd class="kbd kbd-xs">k</kbd>
                </div>
              </button>
            </div>
            <div class="form-control">
              <NuxtLink
                to="/moods"
                class="text-md btn-primary btn normal-case sm:text-lg md:text-lg"
              >
                <i class="bx bxs-coffee mr-1 text-2xl"></i>View Your Moods
              </NuxtLink>
            </div>
            <div class="form-control">
              <NuxtLink
                to="/find"
                class="text-md btn-secondary btn normal-case sm:text-lg md:text-lg"
              >
                <i class="bx bxs-coffee mr-1 text-2xl"></i>Find Others
              </NuxtLink>
            </div>
            <div class="divider"></div>
            <div class="form-control">
              <LogoutItem />
            </div>
          </div>
        </form>
      </div>
    </div>
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { FetchError } from "ofetch";
import { coffeePostValidation as schema } from "validation";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

interface IError extends FetchError {
  data: {
    success: boolean;
    error?: string;
    code: number;
  };
}

definePageMeta({
  middleware: "if-not-auth",
});

const send = ref({
  coffeeType: "",
  content: "",
});
const errors = ref<string[]>([]);
const success = ref(false);
const loading = ref(false);

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "k" && e.type === "keydown") e.preventDefault();
  },
});

whenever(keys.ctrl_k, submit);

async function submit() {
  loading.value = true;
  try {
    const value = await schema.parseAsync(send.value);
    await useAsyncData("brew", () =>
      $fetch("/coffee", {
        method: "POST",
        credentials: "include",
        body: value,
      })
        .then(() => {
          errors.value = [];
          success.value = true;
          send.value = {
            coffeeType: "",
            content: "",
          };
        })
        .catch((error: IError) => {
          success.value = false;
          if (error.data.error && error.data.success === false) {
            if (error.data.code === 401) {
              useCookie("isAuthenticated", {
                path: "/",
                maxAge: -1,
              }).value = "false";
              navigateTo("/login");
            } else {
              errors.value = [error.data.error];
            }
          }
        })
    );
  } catch (error) {
    success.value = false;
    if (error instanceof ZodError) {
      errors.value = [fromZodError(error).message];
    } else {
      throw error;
    }
  }
  loading.value = false;
}
</script>
