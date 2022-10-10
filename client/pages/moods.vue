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
        <div
          v-for="mood in moods"
          :key="mood"
          class="card bg-accent p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
        >
          <div
            class="tooltip tooltip-right tooltip-primary hover:z-50"
            data-tip="Coffee"
          >
            <h1 class="font-extrabold">
              <i class="bx bxs-coffee-bean mr-1 text-xl"></i
              >{{ mood.coffeeType }}
            </h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
            <h1 class="font-bold">{{ mood.content }}</h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h1 class="font-code text-xs bg-secondary p-1 rounded">
              {{ date(mood.createdAt) }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ohmyfetch";

interface IRes {
  success: boolean;
  moods: Mood[];
}

interface Mood {
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
          for (const x in res.moods) {
            if (res.moods[x].coffeeType === "black") {
              res.moods[x].coffeeType = "Black";
            } else if (res.moods[x].coffeeType === "americano") {
              res.moods[x].coffeeType = "Americano";
            } else if (res.moods[x].coffeeType === "latte") {
              res.moods[x].coffeeType = "Latte";
            } else if (res.moods[x].coffeeType === "cappuccino") {
              res.moods[x].coffeeType = "Cappuccino";
            } else if (res.moods[x].coffeeType === "espresso") {
              res.moods[x].coffeeType = "Espresso";
            } else if (res.moods[x].coffeeType === "doppio") {
              res.moods[x].coffeeType = "Doppio";
            } else if (res.moods[x].coffeeType === "cortado") {
              res.moods[x].coffeeType = "Cortado";
            } else if (res.moods[x].coffeeType === "red-eye") {
              res.moods[x].coffeeType = "Red Eye";
            } else if (res.moods[x].coffeeType === "galao") {
              res.moods[x].coffeeType = "Galão";
            } else if (res.moods[x].coffeeType === "lungo") {
              res.moods[x].coffeeType = "Lungo";
            } else if (res.moods[x].coffeeType === "macchiato") {
              res.moods[x].coffeeType = "Macchiato";
            } else if (res.moods[x].coffeeType === "mocha") {
              res.moods[x].coffeeType = "Mocha";
            } else if (res.moods[x].coffeeType === "ristretto") {
              res.moods[x].coffeeType = "Ristretto";
            } else if (res.moods[x].coffeeType === "flat-white") {
              res.moods[x].coffeeType = "Flat White";
            } else if (res.moods[x].coffeeType === "affogato") {
              res.moods[x].coffeeType = "Affogato";
            } else if (res.moods[x].coffeeType === "cafe-au-lait") {
              res.moods[x].coffeeType = "Café Au Lait";
            } else if (res.moods[x].coffeeType === "irish") {
              res.moods[x].coffeeType = "Irish";
            }
          }
          console.log(res.moods);
          moods.value = res.moods;
          loading.value = false;
        })
        .catch((e: IError) => {
          if (e.data.error && e.data.success === false && e.data.code === 401) {
            useCookie("is-authenticated", {
              path: "/",
            }).value = "false";
            navigateTo("/login");
          }
        }),
    {
      initialCache: false,
    }
  );
});

function date(date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(date));
}
</script>
