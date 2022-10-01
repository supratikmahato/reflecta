<template>
  <div class="min-h-screen min-w-full bg-black">
    <video
      autoplay
      muted
      loop
      class="fixed top-0 right-0 min-h-full min-w-full"
      poster="/videos/background.gif"
    ></video>
    <div
      class="fixed flex flex-col gap-y-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-gilroy font-extrabold text-3xl p-6 clay rounded-3xl text-center"
    >
      <i class="bx bxs-coffee text-5xl"></i>
      <digital-clock :blink="false" :twelveHour="true" />
      <h1 class="font-medium text-base">{{ location }}</h1>
      <NuxtLink to="/brew" class="btn btn-accent normal-case"
        >How are you feeling today?</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface IRes {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}

const location = ref("");

onBeforeMount(async () => {
  await useAsyncData(() =>
    $fetch<IRes>("https://geolocation-db.com/json/", {
      parseResponse: JSON.parse,
    }).then((res) => {
      location.value = `${res.city ? res.city : ""}${
        res.city && res.country_code ? ", " : ""
      }${res.country_code ? res.country_code : ""}`;
    })
  );
});
</script>

<style scoped>
.clay {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 35px 35px 68px 0 rgba(145, 192, 255, 0.5),
    inset -8px -8px 16px 0 rgba(145, 192, 255, 0.6),
    inset 0 11px 28px 0 rgb(255, 255, 255);
}
</style>
