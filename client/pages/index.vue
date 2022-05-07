<template>
  <div
    class="min-h-screen flex flex-col gap-y-6 justify-center items-center p-5"
  >
    <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl">Mood.</h1>
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
    <div v-else-if="success">
      <div class="alert alert-success">
        <h1>Successfully brewed your coffee</h1>
      </div>
    </div>
    <form @submit.prevent="submit">
      <div class="flex flex-col gap-y-5 w-full">
        <select v-model="send['coffee-type']" class="select select-primary">
          <option disabled selected value="">
            Select one coffee according to your mood
          </option>
          <option value="black">Black</option>
          <option value="americano">Americano</option>
          <option value="latte">Latte</option>
          <option value="cappuccino">Cappuccino</option>
          <option value="espresso">Espresso</option>
          <option value="doppio">Doppio</option>
          <option value="cortado">Cortado</option>
          <option value="red-eye">Red Eye</option>
          <option value="galao">Galão</option>
          <option value="lungo">Lungo</option>
          <option value="macchiato">Macchiato</option>
          <option value="mocha">Mocha</option>
          <option value="ristretto">Ristretto</option>
          <option value="flat-white">Flat White</option>
          <option value="affogato">Affogato</option>
          <option value="cafe-au-lait">Café Au Lait</option>
          <option value="irish">Irish</option>
        </select>
        <input
          v-model="send.content"
          class="textarea resize-none textarea-primary"
          placeholder="How are you feeling today?"
        />
        <button
          type="submit"
          class="btn btn-accent text-md sm:text-lg md:text-lg normal-case"
        >
          <i class="bx bx-coffee-togo mr-1 text-2xl"></i>Brew
        </button>
        <NuxtLink
          to="/posts"
          class="btn btn-primary text-md sm:text-lg md:text-lg normal-case"
        >
          <i class="bx bxs-coffee mr-1 text-2xl"></i>View Your Posts
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script>
import Joi from "joi";

const schema = Joi.object().keys({
  "coffee-type": Joi.string()
    .valid(
      "black",
      "americano",
      "latte",
      "cappuccino",
      "espresso",
      "doppio",
      "cortado",
      "red-eye",
      "galao",
      "lungo",
      "macchiato",
      "mocha",
      "ristretto",
      "flat-white",
      "affogato",
      "cafe-au-lait",
      "irish"
    )
    .required()
    .label("Coffee Type"),
  content: Joi.string().required().trim().min(1).max(100).label("Content"),
});

export default {
  middleware: "ifNotAuth",
  data() {
    return {
      send: {
        "coffee-type": "",
        content: "",
      },
      errors: [],
      success: "",
    };
  },
  methods: {
    async submit() {
      const { error } = schema.validate(
        {
          "coffee-type": this.send["coffee-type"],
          content: this.send.content,
        },
        {
          abortEarly: false,
        }
      );
      if (error) {
        this.errors = error.details.map((e) => e.message);
      } else {
        this.errors = [];
        await fetch(`${process.env.baseUrl}/coffee`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify({
            "coffee-type": this.send["coffee-type"],
            content: this.send.content.trim(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error && data.success === false) {
              if (data.code === 401) {
                this.$cookies.set("is-authenticated", false, {
                  path: "/",
                });
                this.$router.push("/login");
              } else {
                this.errors = [data.error];
              }
            } else {
              this.success = true;
            }
          });
      }
    },
  },
};
</script>
