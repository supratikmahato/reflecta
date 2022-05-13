<template>
  <div class="tooltip tooltip-secondary z-50" data-tip="Logout">
    <button class="btn btn-primary" @click="logout">
      <i class="bx bx-log-out text-xl"></i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access-token");
      this.$cookies.set("is-authenticated", false, {
        path: "/",
      });
      this.$router.push("/login");
    },
  },
};
</script>
