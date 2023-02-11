<template>
  <div class="flex flex-col items-center justify-center gap-y-2 bg-accent p-6">
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
