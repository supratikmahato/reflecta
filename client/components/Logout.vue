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
function logout() {
  localStorage.removeItem("access-token");
  useCookie("is-authenticated", {
    path: "/",
  }).value = "false";
  navigateTo("/login");
}
</script>
