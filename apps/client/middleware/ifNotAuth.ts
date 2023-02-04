export default defineNuxtRouteMiddleware(() => {
  if (!useCookie("isAuthenticated").value) {
    return "/login";
  }
});
