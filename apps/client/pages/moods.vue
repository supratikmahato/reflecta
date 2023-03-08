<template>
  <div>
    <div v-if="loading"><LoadingItem /></div>
    <div v-else class="min-h-screen p-4 text-center">
      <h1 class="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
        Your Moods
      </h1>
      <div
        v-auto-animate
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <LogoutItem class="col-span-1 md:col-span-2 lg:col-span-3" />
        <NuxtLink
          to="/brew"
          class="card btn-primary flex flex-col items-center justify-center gap-2 overflow-visible p-4 shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <MoodItem
          v-for="mood in moods"
          :key="mood.id"
          :is-self="true"
          :mood="mood"
          @success="handleSuccess"
        />
      </div>
    </div>
    <ScrollToTop>
      <div v-if="success === true" class="alert alert-success shadow-lg">
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
          <span>Successfully updated your mood!</span>
        </div>
      </div>
      <div v-else-if="success === false" class="alert alert-error shadow-lg">
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error updating your mood.</span>
        </div>
      </div>
    </ScrollToTop>
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ofetch";

interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
}
interface IRes {
  success: boolean;
  moods: IMood[];
}
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

const loading = ref(false);
const moods = ref<IMood[]>([]);
const success = ref<boolean>();

watch(success, () => {
  if (success.value === true) {
    setTimeout(() => {
      success.value = undefined;
    }, 2500);
  }
});

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData("fetch-moods", () =>
    useExtendedFetch<IRes>("/coffee", {
      credentials: "include",
    })
      .then((res) => {
        moods.value = res.moods;
        loading.value = false;
      })
      .catch((error: IError) => {
        if (
          error.data.error &&
          error.data.success === false &&
          error.data.code === 401
        ) {
          useCookie("isAuthenticated", {
            path: "/",
            maxAge: -1,
          }).value = "false";
          navigateTo("/login");
        }
      })
  );
});

function handleSuccess(value: boolean) {
  success.value = value;
}
</script>
