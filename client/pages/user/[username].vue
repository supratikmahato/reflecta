<template>
  <div>
    <div v-if="loading"><Loading /></div>
    <div v-else class="min-h-screen text-center p-5">
      <h1 class="text-3xl mb-5 md:text-4xl lg:text-5xl font-bold">
        {{ $route.params.username }}'s Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          to="/brew"
          class="card btn-primary p-4 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="card bg-accent p-4 flex flex-col gap-2 items-center overflow-visible shadow-xl"
        >
          <div
            class="tooltip tooltip-right tooltip-primary hover:z-50"
            data-tip="Coffee"
          >
            <h2 class="font-extrabold">
              <i class="bx bxs-coffee-bean mr-1 text-xl"></i
              >{{ mood.coffeeType }}
            </h2>
          </div>
          <div
            class="flex-1 flex justify-center bg-base-200 w-full rounded-xl p-4 shadow-xl"
          >
            <div
              class="tooltip tooltip-primary hover:z-50 w-full text-left"
              data-tip="Your Mood"
            >
              <p class="font-semibold whitespace-pre-line break-words">
                {{ mood.content }}
              </p>
            </div>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h3 class="font-code text-xs bg-secondary p-1 rounded">
              {{ parseDate(mood.createdAt) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTop />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Joi from "joi";
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

const route = useRoute();

const loading = ref(false);
const moods = ref<IMood[]>([]);

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData("fetch-moods", () =>
    useExtendedFetch<IRes>(`/user/${route.params.username}`, {
      credentials: "include",
    })
      .then((res) => {
        moods.value = res.moods;
        loading.value = false;
      })
      .catch((error: IError) => {})
  );
});

function parseDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(date));
}
</script>
