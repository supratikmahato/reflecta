export default defineNuxtRouteMiddleware(() => {
  useExtendedFetch("/auth", {
    method: "GET",
    credentials: "include",
  }).catch((err) => {
    console.log(err);
    return "/login";
  });
});
