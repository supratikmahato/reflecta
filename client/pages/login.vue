<template>
  <div
    class="hero min-h-screen flex flex-col gap-y-6 justify-center items-center bg-base-200 p-5"
  >
    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Login.</h1>
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div
        v-if="errors.length"
        class="flex flex-col gap-y-1 h-auto text-sm pr-3 pl-3"
      >
        <h1
          v-for="error in errors"
          :key="error"
          class="alert alert-error p-2 shadow-md"
        >
          {{ error }}
        </h1>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="form.email"
                type="text"
                placeholder="email"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="form.password"
                type="password"
                placeholder="password"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary normal-case">
                Login
              </button>
            </div>
            <h1 class="mt-6">
              Don't have an account? Create one
              <NuxtLink class="text-accent underline" to="/register"
                >here</NuxtLink
              >.
            </h1>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Joi from "joi";

const schema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .label("Email"),
  password: Joi.string().required().min(6).trim().label("Password"),
});

export default {
  middleware: "ifAuth",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async submit() {
      const { error } = schema.validate(
        {
          email: this.form.email,
          password: this.form.password,
        },
        {
          abortEarly: false,
        }
      );
      if (error) {
        this.errors = error.details.map((e) => e.message);
      } else {
        this.errors = [];
        await fetch(`${process.env.baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.form.email.trim(),
            password: this.form.password.trim(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error && data.success === false) {
              this.errors = [data.error];
            } else {
              localStorage.setItem("access-token", data["access-token"]);
              this.$cookies.set("is-authenticated", true, {
                path: "/",
                maxAge: 60 * 60 * 24 * 60,
              });
              this.$router.push("/");
            }
          });
      }
    },
  },
};
</script>
