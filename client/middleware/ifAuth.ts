export default defineNuxtRouteMiddleware(() => {
  $fetch("/auth", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    return "/";
  });
});
