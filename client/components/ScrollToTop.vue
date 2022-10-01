<template>
  <div
    ref="scrollTopButton"
    class="invisible sticky w-full flex justify-end bottom-0 pb-4 px-4 transition"
  >
    <div class="text-primary hover:text-primary-focus transition">
      <button
        @click="scrollToTop"
        role="button"
        aria-label="scroll to top of the page"
      >
        <i class="text-6xl bx bxs-up-arrow-circle"></i>
      </button>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data() {
    return {
      handleDebouncedScroll: null,
    };
  },
  mounted() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 50);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    handleScroll() {
      const scrollBtn = this.$refs.scrollTopButton;

      if (window.scrollY > 0) {
        scrollBtn.classList.remove("invisible");
      } else {
        scrollBtn.classList.add("invisible");
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped></style>
