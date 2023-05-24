<template>
  <div class="bg-accent flex flex-col items-center justify-center gap-y-2 p-6">
    <p class="font-code">Version: v{{ version }}</p>
    <p class="text-lg">
      Copyright
      <a href="https://techgenius7777.tech" class="link">Tech Genius</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { version } from "../package.json";
</script>
