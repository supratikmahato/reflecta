<template>
  <time>
    <span>{{ hours }}</span
    ><span> : </span><span>{{ minutes }}</span
    ><span class="text-sm font-bold">&nbsp;{{ amPm }}</span>
  </time>
</template>

<script setup lang="ts">
function padZero(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return String(number);
}
function getDate() {
  return new Date();
}
function getMinutes() {
  return padZero(getDate().getMinutes());
}
function getHour() {
  let hours = getDate().getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  return padZero(hours);
}
function getAmPm() {
  return getDate().getHours() >= 12 ? "PM" : "AM";
}

const ticker = ref();
const minutes = ref(getMinutes());
const hours = ref(getHour());
const amPm = ref(getAmPm());

onBeforeMount(() => {
  ticker.value = setInterval(() => {
    minutes.value = getMinutes();
    hours.value = getHour();
    amPm.value = getAmPm();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(ticker.value);
});
</script>
