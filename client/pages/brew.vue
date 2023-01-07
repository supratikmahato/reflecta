<template>
  <div>
    <div
      class="min-h-screen flex flex-col gap-y-6 justify-center items-center p-5"
    >
      <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
        Mood.
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
      <div
        v-if="success"
        class="flex flex-col gap-y-1 h-auto text-sm pr-3 pl-3"
      >
        <div class="alert alert-success p-2 shadow-md">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Successfully brewed your mood!</span>
        </div>
      </div>
      <div class="card flex-shrink-0 w-full max-w-lg clay">
        <form @submit.prevent="submit">
          <div class="card-body gap-y-3">
            <div class="form-control">
              <select
                v-model.trim="send.coffeeType"
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
              <textarea
                v-model.trim="send.content"
                class="textarea textarea-primary resize-none min-h-[10rem]"
                placeholder="How are you feeling today?"
                required
              ></textarea>
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
              <NuxtLink
                to="/find"
                class="btn btn-secondary text-md sm:text-lg md:text-lg normal-case"
              >
                <i class="bx bxs-coffee mr-1 text-2xl"></i>Find Others
              </NuxtLink>
            </div>
            <div class="divider"></div>
            <div class="form-control">
              <Logout />
            </div>
          </div>
        </form>
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
  coffeeType: Joi.string()
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
  content: Joi.string().required().trim().min(1).max(1000).label("Content"),
});

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

async function submit() {
  loading.value = true;
  try {
    const value = await schema.validateAsync(send.value);
    await useAsyncData("brew", () =>
      useExtendedFetch("/coffee", {
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
    if (error instanceof ValidationError) {
      errors.value = error.details.map((detail) => detail.message);
    } else {
      throw error;
    }
  }
  loading.value = false;
}
</script>

<style scoped>
.clay {
  backdrop-filter: blur(5px);
  background-color: rgba(240, 234, 210, 1);
  box-shadow: 35px 35px 68px 0px rgba(240, 234, 210, 0.5),
    inset -12px -12px 16px 0px rgba(240, 234, 210, 0.6),
    inset 0px 11px 28px 0px rgb(255, 255, 255);
}
</style>
