export default function ({ app, redirect }) {
  if (!app.$cookies.get("is-authenticated")) {
    return redirect("/login");
  }
}
