export default defineNuxtRouteMiddleware(() => {
  useExtendedFetch("/auth", {
    method: "GET",
    credentials: "include",
  }).catch(() => {
    return "/login";
  });
});
