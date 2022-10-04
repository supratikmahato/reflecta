<template>
  <div
    class="min-h-screen flex flex-col gap-y-6 justify-center items-center p-5"
  >
    <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">
      Mood.
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
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form @submit.prevent="submit">
        <div class="card-body gap-y-3">
          <div class="form-control">
            <select
              v-model.trim="send['coffee-type']"
              class="select select-primary"
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
            <input
              v-model.trim="send.content"
              class="textarea resize-none textarea-primary"
              placeholder="How are you feeling today?"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-accent text-md sm:text-lg md:text-lg normal-case"
              :class="loading ? 'loading' : ''"
            >
              <i class="bx bx-coffee-togo mr-1 text-2xl"></i>Brew Your Mood
            </button>
          </div>
          <div class="form-control">
            <NuxtLink
              to="/moods"
              class="btn btn-primary text-md sm:text-lg md:text-lg normal-case"
            >
              <i class="bx bxs-coffee mr-1 text-2xl"></i>View Your Moods
            </NuxtLink>
          </div>
          <div class="form-control">
            <Logout />
          </div>
        </div>
      </form>
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
  "coffee-type": Joi.string()
    .valid(
      "black",
      "americano",
      "latte",
      "cappuccino",
      "espresso",
      "doppio",
      "cortado",
      "red-eye",
      "galao",
      "lungo",
      "macchiato",
      "mocha",
      "ristretto",
      "flat-white",
      "affogato",
      "cafe-au-lait",
      "irish"
    )
    .required()
    .label("Coffee Type"),
  content: Joi.string().required().trim().min(1).max(100).label("Content"),
});

definePageMeta({
  middleware: "if-not-auth",
});

const config = useRuntimeConfig();

const send = ref({
  "coffee-type": "",
  content: "",
});
const errors = ref([]);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    const value = await schema.validateAsync(send.value);
    await useAsyncData(
      () =>
        $fetch(`${config.baseUrl}/coffee`, {
          method: "POST",
          credentials: "include",
          body: value,
        })
          .then(() => {
            errors.value = [];
            send.value = {
              "coffee-type": "",
              content: "",
            };
          })
          .catch((e: IError) => {
            if (e.data.error && e.data.success === false) {
              if (e.data.code === 401) {
                useCookie("is-authenticated", {
                  path: "/",
                }).value = "false";
                navigateTo("/login");
              } else {
                errors.value = [e.data.error];
              }
            }
          }),
      {
        initialCache: false,
      }
    );
  } catch (e) {
    errors.value = e.details.map((detail) => detail.message);
  }
  loading.value = false;
}
</script>
