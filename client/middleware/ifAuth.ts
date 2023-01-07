export default defineNuxtRouteMiddleware(async () => {
  if (useCookie("isAuthenticated").value) {
    return "/";
  }
});
