<template>
  <div>
    <div v-if="loading"><LoadingItem /></div>
    <div v-else class="min-h-screen p-5 text-center">
      <h1 class="mb-5 text-3xl font-bold md:text-4xl lg:text-5xl">
        Your Moods
      </h1>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LogoutItem class="col-span-1 md:col-span-2 lg:col-span-3" />
        <NuxtLink
          to="/brew"
          class="card btn-primary flex flex-col items-center justify-center gap-2 overflow-visible p-4 shadow-xl"
          >Didn't See Your Mood Here?<br />Create More Moods</NuxtLink
        >
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="card flex flex-col items-center gap-2 overflow-visible bg-accent p-4 shadow-xl"
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
            class="flex w-full flex-1 justify-center rounded-xl bg-base-200 p-4 shadow-xl"
          >
            <textarea
              v-if="editOffset === mood.id"
              v-model.trim="send.content"
              class="textarea-primary textarea h-full min-h-[10rem] w-full resize-none"
              required
              placeholder="What's your mood?"
              @keydown.esc="handleEditClose"
            ></textarea>
            <div
              v-else
              class="tooltip tooltip-primary w-full text-left hover:z-50"
              data-tip="Your Mood"
            >
              <p class="whitespace-pre-line break-words font-semibold">
                {{ mood.content }}
              </p>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label cursor-pointer">
              <span className="label-text text-base">Make Public</span>
              <input
                v-model="mood.isPublic"
                type="checkbox"
                className="checkbox checkbox-primary"
                @change.prevent="handleDebouncedIsPublicChange(mood.id)"
              />
            </label>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-if="editOffset === mood.id"
              class="btn"
              @click.prevent="handleEditClose"
            >
              <i class="bx bx-x text-3xl"></i>
            </button>
            <button
              v-if="editOffset === mood.id"
              class="btn"
              @click.prevent="handleEditSubmit(mood.id)"
            >
              <i class="bx bx-check text-3xl"></i>
            </button>
            <template v-else>
              <button
                class="btn-error btn"
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
            <h3 class="rounded bg-secondary p-1 font-code text-xs">
              {{ parseDate(mood.createdAt) }}
            </h3>
          </div>
          <div
            class="modal modal-bottom sm:modal-middle"
            :class="deleteOffset ? 'modal-open' : ''"
          >
            <div class="modal-box">
              <h3 class="text-center text-lg font-bold">
                Are you sure you want to delete this mood?
              </h3>
              <div class="modal-action justify-center">
                <button
                  class="btn-error btn normal-case"
                  @click.prevent="handleDeleteSubmit"
                >
                  Yes
                </button>
                <button
                  class="btn normal-case"
                  @click.prevent="handleDeleteClose"
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
    <FooterItem />
  </div>
</template>

<script setup lang="ts">
import debounce from "lodash/debounce";
import { FetchError } from "ofetch";
import { coffeePatchValidation as schema } from "validation";

interface IMood {
  id: string;
  coffeeType: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
}
interface IRes {
  success: boolean;
  moods: IMood[];
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
    const value = await schema.parseAsync(send.value);
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
