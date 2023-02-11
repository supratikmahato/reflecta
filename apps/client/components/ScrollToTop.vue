<template>
  <div
    ref="scrollTopButton"
    class="invisible sticky bottom-0 flex w-full justify-end px-4 pb-4 transition"
  >
    <div class="text-primary transition hover:text-primary-focus">
      <button
        role="button"
        aria-label="scroll to top of the page"
        @click="scrollToTop"
      >
        <i class="bx bxs-up-arrow-circle text-6xl"></i>
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
