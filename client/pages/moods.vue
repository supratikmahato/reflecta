<template>
  <div>
    <div v-if="loading"><Loading /></div>
    <div v-else class="min-h-screen text-center p-5">
      <h1 class="text-3xl mb-5 md:text-4xl lg:text-5xl">Your Moods</h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="mood in moods"
          :key="mood"
          class="card bg-accent p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
        >
          <div
            class="tooltip tooltip-right tooltip-primary hover:z-50"
            data-tip="Coffee"
          >
            <h1 class="font-extrabold">
              <i class="bx bx-coffee-togo mr-1 text-xl"></i
              >{{ mood["coffee-type"] }}
            </h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
            <h1 class="font-bold">{{ mood.content }}</h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h1 class="font-code text-xs bg-secondary p-1 rounded">
              {{ date(mood["created-at"]) }}
            </h1>
          </div>
        </div>
        <NuxtLink
          to="/brew"
          class="btn btn-primary text-md sm:text-lg md:text-lg normal-case col-span-1 md:col-span-2 lg:col-span-3 mt-4"
          >Create More Moods</NuxtLink
        >
      </div>
      <Logout class="mt-4" />
    </div>
  </div>
</template>

<script>
import hdate from "human-date";

export default {
  middleware: "ifNotAuth",
  data() {
    return {
      loading: "",
      moods: [],
      errors: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      await fetch(`${process.env.baseUrl}/coffee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error && data.success === false) {
            if (data.code === 401) {
              this.$cookies.set("is-authenticated", false, {
                path: "/",
              });
              this.$router.push("/login");
            }
          } else {
            for (const x in data.mood) {
              if (data.mood[x]["coffee-type"] === "black") {
                data.mood[x]["coffee-type"] = "Black";
              } else if (data.mood[x]["coffee-type"] === "americano") {
                data.mood[x]["coffee-type"] = "Americano";
              } else if (data.mood[x]["coffee-type"] === "latte") {
                data.mood[x]["coffee-type"] = "Latte";
              } else if (data.mood[x]["coffee-type"] === "cappuccino") {
                data.mood[x]["coffee-type"] = "Cappuccino";
              } else if (data.mood[x]["coffee-type"] === "espresso") {
                data.mood[x]["coffee-type"] = "Espresso";
              } else if (data.mood[x]["coffee-type"] === "doppio") {
                data.mood[x]["coffee-type"] = "Doppio";
              } else if (data.mood[x]["coffee-type"] === "cortado") {
                data.mood[x]["coffee-type"] = "Cortado";
              } else if (data.mood[x]["coffee-type"] === "red-eye") {
                data.mood[x]["coffee-type"] = "Red Eye";
              } else if (data.mood[x]["coffee-type"] === "galao") {
                data.mood[x]["coffee-type"] = "Galão";
              } else if (data.mood[x]["coffee-type"] === "lungo") {
                data.mood[x]["coffee-type"] = "Lungo";
              } else if (data.mood[x]["coffee-type"] === "macchiato") {
                data.mood[x]["coffee-type"] = "Macchiato";
              } else if (data.mood[x]["coffee-type"] === "mocha") {
                data.mood[x]["coffee-type"] = "Mocha";
              } else if (data.mood[x]["coffee-type"] === "ristretto") {
                data.mood[x]["coffee-type"] = "Ristretto";
              } else if (data.mood[x]["coffee-type"] === "flat-white") {
                data.mood[x]["coffee-type"] = "Flat White";
              } else if (data.mood[x]["coffee-type"] === "affogato") {
                data.mood[x]["coffee-type"] = "Affogato";
              } else if (data.mood[x]["coffee-type"] === "cafe-au-lait") {
                data.mood[x]["coffee-type"] = "Café Au Lait";
              } else if (data.mood[x]["coffee-type"] === "irish") {
                data.mood[x]["coffee-type"] = "Irish";
              }
            }
            this.moods = data.mood;
            this.loading = false;
          }
        });
    },
    date(date) {
      return hdate.prettyPrint(new Date(date), { showTime: true });
    },
  },
};
</script>
