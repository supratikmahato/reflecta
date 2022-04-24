<template>
  <div class="index">
    <div>
      <i class="heart bx bxs-heart"></i>
      <h1 class="loading">Loading...</h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.heart {
  font-size: 10em;
  color: #ff5757;
  animation: lds-heart 1.75s infinite;
}
.loading {
  font-size: 3rem;
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
