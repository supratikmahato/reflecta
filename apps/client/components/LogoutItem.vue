<template>
  <button
    type="button"
    class="text-md btn-accent btn normal-case sm:text-lg md:text-lg"
    @click="logout"
  >
    <i class="bx bx-log-out mr-1 text-2xl"></i>Log Out
  </button>
</template>

<script setup lang="ts">
async function logout() {
  await useAsyncData(() =>
    useExtendedFetch("/auth/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => {
      useCookie("isAuthenticated", {
        path: "/",
        maxAge: -1,
      }).value = "false";
      navigateTo("/");
    })
  );
}
</script>
