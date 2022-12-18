<template>
  <div class="p-6 bg-accent flex flex-col gap-y-2 justify-center items-center">
    <code>Version: {{ data }}</code>
    <h2>
      Copyright
      <a href="https://techgenius7777.tech" class="link">Tech Genius</a>
    </h2>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/get-version");
</script>

<style scoped></style>
