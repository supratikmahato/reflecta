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
              >{{ mood["coffee-type"] }}
            </h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
            <h1 class="font-bold">{{ mood.content }}</h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h1 class="font-code text-xs bg-secondary p-1 rounded">
              {{ date(mood["created-at"]) }}
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
  mood: Mood[];
}

interface Mood {
  "coffee-type": string;
  content: string;
  _id: string;
  id: string;
  "created-at": Date;
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
          for (const x in res.mood) {
            if (res.mood[x]["coffee-type"] === "black") {
              res.mood[x]["coffee-type"] = "Black";
            } else if (res.mood[x]["coffee-type"] === "americano") {
              res.mood[x]["coffee-type"] = "Americano";
            } else if (res.mood[x]["coffee-type"] === "latte") {
              res.mood[x]["coffee-type"] = "Latte";
            } else if (res.mood[x]["coffee-type"] === "cappuccino") {
              res.mood[x]["coffee-type"] = "Cappuccino";
            } else if (res.mood[x]["coffee-type"] === "espresso") {
              res.mood[x]["coffee-type"] = "Espresso";
            } else if (res.mood[x]["coffee-type"] === "doppio") {
              res.mood[x]["coffee-type"] = "Doppio";
            } else if (res.mood[x]["coffee-type"] === "cortado") {
              res.mood[x]["coffee-type"] = "Cortado";
            } else if (res.mood[x]["coffee-type"] === "red-eye") {
              res.mood[x]["coffee-type"] = "Red Eye";
            } else if (res.mood[x]["coffee-type"] === "galao") {
              res.mood[x]["coffee-type"] = "Galão";
            } else if (res.mood[x]["coffee-type"] === "lungo") {
              res.mood[x]["coffee-type"] = "Lungo";
            } else if (res.mood[x]["coffee-type"] === "macchiato") {
              res.mood[x]["coffee-type"] = "Macchiato";
            } else if (res.mood[x]["coffee-type"] === "mocha") {
              res.mood[x]["coffee-type"] = "Mocha";
            } else if (res.mood[x]["coffee-type"] === "ristretto") {
              res.mood[x]["coffee-type"] = "Ristretto";
            } else if (res.mood[x]["coffee-type"] === "flat-white") {
              res.mood[x]["coffee-type"] = "Flat White";
            } else if (res.mood[x]["coffee-type"] === "affogato") {
              res.mood[x]["coffee-type"] = "Affogato";
            } else if (res.mood[x]["coffee-type"] === "cafe-au-lait") {
              res.mood[x]["coffee-type"] = "Café Au Lait";
            } else if (res.mood[x]["coffee-type"] === "irish") {
              res.mood[x]["coffee-type"] = "Irish";
            }
          }
          moods.value = res.mood.reverse();
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
