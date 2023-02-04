<template>
  <div>
    <div v-if="loading"><LoadingItem /></div>
    <div v-else class="min-h-screen p-5 text-center">
      <h1 class="mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
        {{ username }}'s Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          to="/brew"
          class="card btn-primary flex flex-col items-center justify-center gap-2 overflow-visible p-4 shadow-xl"
          >Want To Create Your Own Mood?</NuxtLink
        >
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="card flex flex-col items-center gap-2 overflow-visible bg-accent p-4 shadow-xl"
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
            class="flex w-full flex-1 justify-center rounded-xl bg-base-200 p-4 shadow-xl"
          >
            <div
              class="tooltip tooltip-primary w-full text-left hover:z-50"
              data-tip="Your Mood"
            >
              <p class="whitespace-pre-line break-words font-semibold">
                {{ mood.content }}
              </p>
            </div>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h3 class="rounded bg-secondary p-1 font-code text-xs">
              {{ parseDate(mood.createdAt) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTop />
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  createdAt: Date;
}
interface IRes {
  success: boolean;
  moods: IMood[];
}

definePageMeta({
  middleware: "if-not-auth",
});

const route = useRoute();

const username = ref(route.params.username);
const loading = ref(false);
const moods = ref<IMood[]>([]);

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData("fetch-moods", () =>
    useExtendedFetch<IRes>(`/user/${route.params.username}`, {
      credentials: "include",
    }).then((res) => {
      moods.value = res.moods;
      loading.value = false;
    })
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
