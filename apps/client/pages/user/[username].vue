<template>
  <div>
    <div v-if="loading"><LoadingItem /></div>
    <div v-else class="min-h-screen p-4 text-center">
      <h1 class="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
        {{ username }}'s Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          to="/brew"
          class="card btn-primary flex flex-col items-center justify-center gap-2 overflow-visible p-4 shadow-xl"
          >Want To Create Your Own Mood?</NuxtLink
        >
        <MoodItem
          v-for="mood in moods"
          :key="mood.id"
          :is-self="false"
          :username="username"
          :mood="mood"
        />
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
</script>
