<template>
  <div class="hero min-h-screen bg-base-200 p-5">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div v-if="errors.length">
        <div>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </div>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="submit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                v-model="form.username"
                type="text"
                placeholder="username"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="form.email"
                type="text"
                placeholder="email"
                class="input input-bordered"
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
              />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Joi from "joi";

const schema = Joi.object().keys({
  username: Joi.string().required().label("Username"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

export default {
  middleware: "ifAuth",
  data() {
    return {
      form: {
        username: "",
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
          username: this.form.username,
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
        await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error && data.success === false) {
              this.errors = [data.error];
            } else {
              this.$router.push("/login");
            }
          });
      }
    },
  },
};
</script>
