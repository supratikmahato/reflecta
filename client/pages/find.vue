<template>
  <div>
    <div class="hero min-h-screen flex flex-col bg-base-200 p-5">
      <h1 class="text-4xl mb-5 sm:text-5xl md:text-6xl lg:text-6xl font-bold">
        Find Others.
      </h1>
      <div class="hero-content flex-col lg:flex-row-reverse w-[30rem] p-0">
        <div class="card flex-shrink-0 w-full clay">
          <div class="card-body" :class="users.length ? 'gap-8' : 'gap-0'">
            <input
              v-model="username"
              type="text"
              placeholder="Enter username to search"
              class="input input-bordered w-full"
              required
              @input.prevent="handleDebouncedFind"
            />
            <div class="flex flex-col gap-2">
              <NuxtLink
                v-for="user in users"
                :key="user.id"
                :to="`/user/${user.username}`"
                class="card bg-accent p-4 flex flex-col gap-2 items-center overflow-visible shadow-xl"
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
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { FetchError } from "ohmyfetch";
import debounce from "lodash/debounce";

interface IRes {
  success: boolean;
  users: IUser[];
}
interface IUser {
  id: string;
  username: string;
}
interface IError extends FetchError {
  data: {
    success: boolean;
    error?: string;
    code: number;
  };
}

definePageMeta({
  middleware: "if-not-auth",
});

const username = ref("");
const loading = ref(false);
const users = ref<IUser[]>([]);

async function find() {
  loading.value = true;
  try {
    await useAsyncData("find", () =>
      useExtendedFetch<IRes>("/users/find", {
        method: "GET",
        credentials: "include",
        query: {
          username: username.value,
        },
      }).then((res) => {
        users.value = res.users;
      })
    );
  } catch (error) {
    throw error;
  }
  loading.value = false;
}

const handleDebouncedFind = debounce(find, 500);
</script>
