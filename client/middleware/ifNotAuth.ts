export default defineNuxtRouteMiddleware(() => {
  $fetch("/auth", {
    method: "GET",
    credentials: "include",
  }).catch(() => {
    return "/login";
  });
});
