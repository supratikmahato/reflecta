export default defineNuxtRouteMiddleware(() => {
  useExtendedFetch("/auth", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    return "/";
  });
});
