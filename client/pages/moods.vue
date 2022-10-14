<template>
  <div>
    <div v-if="loading"><Loading /></div>
    <div v-else class="min-h-screen text-center p-5">
      <h1 class="text-3xl mb-5 md:text-4xl lg:text-5xl font-bold">
        Your Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Logout class="col-span-1 md:col-span-2 lg:col-span-3" />
        <NuxtLink
          to="/brew"
          class="card btn-primary p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <Mood :moods="moods" />
      </div>
    </div>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ohmyfetch";

interface IRes {
  success: boolean;
  moods: IMood[];
}

interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  createdAt: Date;
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

const config = useRuntimeConfig();

const loading = ref(false);
const moods = ref([]);

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData(
    () =>
      $fetch<IRes>(`${config.baseUrl}/coffee`, {
        credentials: "include",
      })
        .then((res) => {
          moods.value = res.moods;
          loading.value = false;
        })
        .catch((e: IError) => {
          if (e.data.error && e.data.success === false && e.data.code === 401) {
            useCookie("isAuthenticated", {
              path: "/",
              maxAge: -1,
            }).value = "false";
            navigateTo("/login");
          }
        }),
    {
      initialCache: false,
    }
  );
});
</script>
