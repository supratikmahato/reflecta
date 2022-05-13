<template>
  <div class="min-h-screen min-w-full bg-black">
    <video
      autoplay
      muted
      loop
      class="fixed top-0 right-0 min-h-full min-w-full"
    >
      <source src="/videos/chill.mp4" type="video/mp4" />
    </video>
    <div
      class="fixed flex flex-col gap-y-1 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-gilroy font-extrabold text-3xl p-6 glassmorphism rounded-3xl text-center"
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

<script>
export default {
  data() {
    return {
      location: "",
    };
  },
  async created() {
    await fetch("https://geolocation-db.com/json/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.location = `${data.city ? data.city : ""}${
          data.city && data.country_code ? ", " : ""
        }${data.country_code ? data.country_code : ""}`;
      });
  },
};
</script>

<style scoped>
.glassmorphism {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 35px 35px 68px 0 rgba(145, 192, 255, 0.5),
    inset -8px -8px 16px 0 rgba(145, 192, 255, 0.6),
    inset 0 11px 28px 0 rgb(255, 255, 255);
}
</style>
