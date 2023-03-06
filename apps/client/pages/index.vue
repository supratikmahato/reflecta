<template>
  <div class="min-h-screen min-w-full bg-black">
    <video
      autoplay
      muted
      loop
      class="fixed top-0 right-0 min-h-full min-w-full"
    >
      <source src="/videos/background.mp4" type="video/mp4" />
    </video>
    <div
      class="clay fixed top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col gap-y-1 rounded-3xl p-6 text-center font-gilroy text-3xl font-extrabold"
    >
      <i class="bx bxs-coffee text-5xl"></i>
      <DigitalClock :blink="false" :twelve-hour="true" />
      <p class="text-base font-medium">{{ location }}</p>
      <div class="divider"></div>
      <h1 class="text-xl font-bold">{{ welcome }}</h1>
      <NuxtLink to="/brew" class="btn-accent btn mt-4 normal-case"
        >How are you feeling today?</NuxtLink
      >
      <NuxtLink to="/find" class="btn-primary btn mt-2 normal-case"
        >Find Others</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface IGeolocationRes {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}
interface IRes {
  username: string;
}

const location = ref("");
const welcome = ref("Hello!");

onBeforeMount(async () => {
  if (useCookie("locationCache").value) {
    location.value = useCookie("locationCache").value as string;
  } else {
    await useAsyncData(() =>
      $fetch<IGeolocationRes>("https://geolocation-db.com/json/", {
        parseResponse: JSON.parse,
      }).then((res) => {
        location.value = `${res.city ? res.city : ""}${
          res.city && res.country_code ? ", " : ""
        }${res.country_code ? res.country_code : ""}`;
        useCookie("locationCache", {
          path: "/",
        }).value = `${res.city ? res.city : ""}${
          res.city && res.country_code ? ", " : ""
        }${res.country_code ? res.country_code : ""}`;
      })
    );
  }
  await useAsyncData(() =>
    useExtendedFetch<IRes>("/auth/username", {
      credentials: "include",
    }).then((res) => {
      welcome.value = `Hello ${res.username}!`;
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
