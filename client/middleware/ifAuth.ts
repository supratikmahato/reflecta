export default defineNuxtRouteMiddleware(() => {
  useExtendedFetch("/auth", {
    method: "GET",
    credentials: "include",
  }).then((res: any) => {
    if (res.success) {
      return "/login";
    }
  });
});
