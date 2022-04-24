<template>
  <div class="min-h-screen text-center p-5">
    <h1 class="text-5xl mb-5">Your Posts</h1>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="post in posts"
        :key="post"
        class="card bg-accent p-2 flex flex-col gap-2 justify-center items-center overflow-visible"
      >
        <div
          class="tooltip tooltip-right tooltip-primary hover:z-50"
          data-tip="Coffee"
        >
          <h1 class="font-bold">
            <i class="bx bx-coffee-togo mr-1 text-xl"></i
            >{{ post["coffee-type"] }}
          </h1>
        </div>
        <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
          <h1>{{ post.content }}</h1>
        </div>
        <div class="tooltip tooltip-primary hover:z-50" data-tip="Created On">
          <h1 class="font-code text-xs bg-secondary p-1 rounded">
            {{ date(post["created-at"]) }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hdate from "human-date";

export default {
  middleware: "ifNotAuth",
  data() {
    return {
      posts: [],
      errors: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      await fetch("https://coffee-backend.techgenius7777.tech/coffee", {
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
              this.$cookies.set("is-authenticated", false);
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
            this.posts = data.mood;
          }
        });
    },
    date(date) {
      return hdate.prettyPrint(new Date(date), { showTime: true });
    },
  },
};
</script>
