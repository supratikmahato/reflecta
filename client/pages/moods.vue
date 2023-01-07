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
          class="card btn-primary p-4 flex flex-col gap-2 justify-center items-center overflow-visible shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="card bg-accent p-4 flex flex-col gap-2 items-center overflow-visible shadow-xl"
        >
          <div
            class="tooltip tooltip-right tooltip-primary hover:z-50"
            data-tip="Coffee"
          >
            <h2 class="font-extrabold">
              <i class="bx bxs-coffee-bean mr-1 text-xl"></i
              >{{ mood.coffeeType }}
            </h2>
          </div>
          <div
            class="flex-1 flex justify-center bg-base-200 w-full rounded-xl p-4 shadow-xl"
          >
            <textarea
              v-if="editOffset === mood.id"
              v-model.trim="send.content"
              class="textarea textarea-primary resize-none min-h-[10rem] h-full w-full"
              required
              @keydown.esc="handleEditClose"
              placeholder="What's your mood?"
            ></textarea>
            <div
              v-else
              class="tooltip tooltip-primary hover:z-50 w-full text-left"
              data-tip="Your Mood"
            >
              <p class="font-semibold whitespace-pre-line break-words">
                {{ mood.content }}
              </p>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text text-base">Make Public</span>
              <input
                type="checkbox"
                v-model="mood.isPublic"
                @change.prevent="handleDebouncedIsPublicChange(mood.id)"
                className="checkbox checkbox-primary"
              />
            </label>
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
              <button
                class="btn btn-error"
                @click.prevent="handleDeleteStart(mood.id)"
              >
                <i class="bx bx-trash text-2xl"></i>
              </button>
              <button class="btn" @click.prevent="handleEditStart(mood.id)">
                <i class="bx bx-edit-alt text-2xl"></i>
              </button>
            </template>
          </div>
          <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
            <h3 class="font-code text-xs bg-secondary p-1 rounded">
              {{ parseDate(mood.createdAt) }}
            </h3>
          </div>
          <div
            class="modal modal-bottom sm:modal-middle"
            :class="deleteOffset ? 'modal-open' : ''"
          >
            <div class="modal-box">
              <h3 class="font-bold text-lg text-center">
                Are you sure you want to delete this mood?
              </h3>
              <div class="modal-action justify-center">
                <button
                  class="btn btn-error normal-case"
                  @click.prevent="handleDeleteSubmit"
                >
                  Yes
                </button>
                <button
                  @click.prevent="handleDeleteClose"
                  class="btn normal-case"
                >
                  No
                </button>
              </div>
            </div>
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
import debounce from "lodash/debounce";
import { FetchError } from "ohmyfetch";

interface IRes {
  success: boolean;
  moods: IMood[];
}

interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  isPublic: boolean;
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
  content: Joi.string().required().trim().min(1).max(1000).label("Content"),
});

definePageMeta({
  middleware: "if-not-auth",
});

const loading = ref(false);
const moods = ref<IMood[]>([]);
const editOffset = ref("");
const deleteOffset = ref("");
const send = ref({
  content: "",
});

onBeforeMount(async () => {
  loading.value = true;
  await useAsyncData("fetch-moods", () =>
    useExtendedFetch<IRes>("/coffee", {
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
      useExtendedFetch(`/coffee/${moodId}`, {
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

const handleDebouncedIsPublicChange = debounce(handleIsPublicChange, 500);

async function handleIsPublicChange(moodId: string) {
  await useAsyncData("update-is-public", () =>
    useExtendedFetch(`/coffee/${moodId}`, {
      method: "PATCH",
      credentials: "include",
      body: {
        isPublic: moods.value.find((mood) => mood.id === moodId)!.isPublic,
      },
    })
      .then(() => {})
      .catch((error: IError) => {})
  );
}

function handleDeleteStart(moodId: string) {
  deleteOffset.value = moodId;
}

function handleDeleteClose() {
  deleteOffset.value = "";
}

async function handleDeleteSubmit() {
  const moodId = deleteOffset.value;
  await useAsyncData("delete-mood", () =>
    useExtendedFetch(`/coffee/${moodId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        moods.value = moods.value.filter((mood) => mood.id !== moodId);
        handleDeleteClose();
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
