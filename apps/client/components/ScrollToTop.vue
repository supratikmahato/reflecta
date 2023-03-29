<template>
  <div class="sticky bottom-0 flex w-full justify-end px-4 pb-4 transition">
    <div class="toast-end toast sticky ml-auto min-w-0 p-0 pl-4 pr-4">
      <slot></slot>
    </div>
    <div
      :class="{ invisible }"
      class="text-primary hover:text-primary-focus mt-auto transition"
    >
      <button role="button" @click.prevent="scrollToTop">
        <i class="bx bxs-up-arrow-circle text-6xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";

const handleDebouncedScroll = ref();
const invisible = ref(true);

onMounted(() => {
  handleDebouncedScroll.value = debounce(handleScroll, 50);
  window.addEventListener("scroll", handleDebouncedScroll.value);
});
onBeforeMount(() => {
  window.removeEventListener("scroll", handleDebouncedScroll.value);
});

function handleScroll() {
  if (window.scrollY > 0) {
    invisible.value = false;
  } else {
    invisible.value = true;
  }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
