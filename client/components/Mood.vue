<template>
  <div
    v-for="mood in moods"
    :key="mood.id"
    class="card bg-accent p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
  >
    <div
      class="tooltip tooltip-right tooltip-primary hover:z-50"
      data-tip="Coffee"
    >
      <h1 class="font-extrabold">
        <i class="bx bxs-coffee-bean mr-1 text-xl"></i>{{ mood.coffeeType }}
      </h1>
    </div>
    <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
      <h1 class="font-bold">{{ mood.content }}</h1>
    </div>
    <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
      <h1 class="font-code text-xs bg-secondary p-1 rounded">
        {{ date(mood.createdAt) }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  createdAt: Date;
}

defineProps<{
  moods: IMood[];
}>();

function date(date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(date));
}
</script>

<style scoped></style>
