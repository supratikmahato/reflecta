<template>
  <div>
    <div v-if="loading"><Loading /></div>
    <div v-else class="min-h-screen text-center p-5">
      <h1 class="text-3xl mb-5 md:text-4xl lg:text-5xl font-bold">
        Your Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Logout class="col-span-1 md:col-span-2 lg:col-span-3" />
        <NuxtLink
          to="/brew"
          class="card btn-primary p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="card bg-accent p-2 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
        >
          <div
            class="tooltip tooltip-right tooltip-primary hover:z-50"
            data-tip="Coffee"
          >
            <h1 class="font-extrabold">
              <i class="bx bxs-coffee-bean mr-1 text-xl"></i
              >{{ mood.coffeeType }}
            </h1>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Your Mood">
            <input
              v-if="editOffset === mood.id"
              v-model.trim="send.content"
              class="textarea resize-none textarea-primary"
              required
              @keydown.enter="handleEditSubmit(mood.id)"
              @keydown.esc="handleEditClose"
              placeholder="What's your mood?"
            />
            <h1 v-else class="font-bold">{{ mood.content }}</h1>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              class="btn"
              v-if="editOffset === mood.id"
              @click.prevent="handleEditClose"
            >
              <i class="bx bx-x text-3xl"></i>
            </button>
            <button
              class="btn"
              v-if="editOffset === mood.id"
              @click.prevent="handleEditSubmit(mood.id)"
            >
              <i class="bx bx-check text-3xl"></i>
            </button>
            <template v-else>
              <button class="btn" @click.prevent="handleDelete(mood.id)">
                <i class="bx bx-trash text-2xl"></i>
              </button>
              <button class="btn" @click.prevent="handleEditStart(mood.id)">
                <i class="bx bx-edit-alt text-2xl"></i>
              </button>
            </template>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h1 class="font-code text-xs bg-secondary p-1 rounded">
              {{ parseDate(mood.createdAt) }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <ScrollToTop />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Joi from "joi";
import { FetchError } from "ohmyfetch";

interface IRes {
  success: boolean;
  moods: IMood[];
}

interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  createdAt: Date;
}

interface IError extends FetchError {
  data: {
    success: boolean;
    error?: string;
    code: number;
  };
}

const schema = Joi.object().keys({
  content: Joi.string().required().trim().min(1).max(100).label("Content"),
});

definePageMeta({
  middleware: "if-not-auth",
});

const config = useRuntimeConfig();

const loading = ref(false);
const moods = ref<IMood[]>([]);
const editOffset = ref("");
const send = ref({
  content: "",
});

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData("fetch-moods", () =>
    $fetch<IRes>(`${config.baseUrl}/coffee`, {
      credentials: "include",
    })
      .then((res) => {
        moods.value = res.moods;
        loading.value = false;
      })
      .catch((error: IError) => {
        if (
          error.data.error &&
          error.data.success === false &&
          error.data.code === 401
        ) {
          useCookie("isAuthenticated", {
            path: "/",
            maxAge: -1,
          }).value = "false";
          navigateTo("/login");
        }
      })
  );
});

function handleEditStart(moodId: string) {
  send.value.content = moods.value.find((mood) => mood.id === moodId)!.content;
  editOffset.value = moodId;
}

function handleEditClose() {
  editOffset.value = "";
}

async function handleEditSubmit(moodId: string) {
  try {
    const value = await schema.validateAsync(send.value);
    await useAsyncData("update-mood", () =>
      $fetch(`${config.baseUrl}/coffee/${moodId}`, {
        method: "PATCH",
        credentials: "include",
        body: value,
      })
        .then(() => {
          moods.value = moods.value.map((mood) => {
            if (mood.id === moodId) {
              mood.content = send.value.content;
            }
            return mood;
          });
          handleEditClose();
        })
        .catch((error: IError) => {
          if (error.data.error && error.data.success === false) {
            if (error.data.code === 401) {
              useCookie("isAuthenticated", {
                path: "/",
                maxAge: -1,
              }).value = "false";
              navigateTo("/login");
            }
          }
        })
    );
  } catch (error) {}
}

async function handleDelete(moodId: string) {
  await useAsyncData("delete-mood", () =>
    $fetch(`${config.baseUrl}/coffee/${moodId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        moods.value = moods.value.filter((mood) => mood.id !== moodId);
      })
      .catch((error: IError) => {
        if (error.data.error && error.data.success === false) {
          if (error.data.code === 401) {
            useCookie("isAuthenticated", {
              path: "/",
              maxAge: -1,
            }).value = "false";
            navigateTo("/login");
          }
        }
      })
  );
}

function parseDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(date));
}
</script>
