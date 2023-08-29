<template>
  <div>
    <div class="hero bg-base-200 flex min-h-screen flex-col p-4">
      <h1 class="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-6xl">
        Find Others.
      </h1>
      <div class="hero-content w-[30rem] flex-col p-0 lg:flex-row-reverse">
        <div class="clay card w-full flex-shrink-0">
          <div class="card-body" :class="users.length ? 'gap-8' : 'gap-0'">
            <input
              v-model="username"
              type="text"
              placeholder="Enter username to search"
              class="input-bordered input w-full"
              required
              @input.prevent="handleDebouncedFind"
            />
            <div class="flex flex-col gap-2">
              <NuxtLink
                v-for="user in users"
                :key="user.id"
                :to="`/user/${user.username}`"
                class="card bg-accent flex flex-col items-center gap-2 overflow-visible p-4 shadow-xl"
              >
                <div>
                  <h2 class="font-extrabold">
                    <i class="bx bxs-user mr-1 text-xl"></i>{{ user.username }}
                  </h2>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";

interface IUser {
  id: string;
  username: string;
}
interface IRes {
  success: boolean;
  users: IUser[];
}

definePageMeta({
  middleware: "if-not-auth",
});

const username = ref("");
const loading = ref(false);
const users = ref<IUser[]>([]);

async function find() {
  loading.value = true;

  await useAsyncData("find", () =>
    $fetch<IRes>("/users/find", {
      method: "GET",
      credentials: "include",
      query: {
        username: username.value,
      },
    }).then((res) => {
      users.value = res.users;
    }),
  );
  loading.value = false;
}

const handleDebouncedFind = debounce(find, 500);
</script>
