export default defineNuxtRouteMiddleware(() => {
  if (useCookie("is-authenticated").value) {
    return "/";
  }
});
