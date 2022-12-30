<template>
  <button
    type="button"
    class="btn btn-accent text-md sm:text-lg md:text-lg normal-case"
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
      navigateTo("/");
    })
  );
}
</script>
