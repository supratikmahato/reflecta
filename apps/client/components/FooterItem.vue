<template>
  <div class="bg-accent flex flex-col items-center justify-center gap-y-2 p-6">
    <code>Version: v{{ version }}</code>
    <h2>
      Copyright
      <a href="https://techgenius7777.tech" class="link">Tech Genius</a>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { version } from "../.../../../../package.json";
</script>
