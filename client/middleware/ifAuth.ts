export default defineNuxtRouteMiddleware(() => {
  useExtendedFetch("/auth", {
    method: "GET",
    credentials: "include",
  }).then((res) => {
    console.log(res);
    return "/";
  });
});
