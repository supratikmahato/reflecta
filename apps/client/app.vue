<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { ofetch } from "ofetch";

const config = useRuntimeConfig();

globalThis.$fetch = ofetch.create({ baseURL: config.public.baseUrl });
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
