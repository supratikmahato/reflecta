<template>
  <div class="flex h-screen w-screen items-center justify-center text-center">
    <div>
      <i class="heart bx bxs-heart text-[11em] text-red-500"></i>
      <h1 class="text-5xl font-bold">Loading...</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.heart {
  animation: lds-heart 1.75s infinite;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
