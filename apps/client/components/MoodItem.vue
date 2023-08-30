<template>
  <div
    v-if="!deleteConfirm"
    class="card bg-accent flex flex-col items-center gap-2 overflow-visible p-4 shadow-xl"
  >
    <div
      class="tooltip tooltip-right tooltip-primary hover:z-50"
      data-tip="Coffee"
    >
      <h2 class="text-xl font-extrabold">
        <i class="bx bxs-coffee-bean mr-1 text-xl"></i>{{ moodRef.coffeeType }}
      </h2>
    </div>
    <div
      class="bg-base-200 flex w-full flex-1 justify-center rounded-xl p-4 shadow-xl"
    >
      <textarea
        v-if="isSelf === undefined || false || editOffset"
        v-model.trim="send.content"
        class="textarea-primary textarea h-full min-h-[10rem] w-full resize-none"
        required
        placeholder="What's your mood?"
        @keydown.esc="handleEditClose"
      ></textarea>
      <div
        v-else
        class="tooltip tooltip-primary w-full text-left hover:z-50"
        :data-tip="isSelf ? 'Your Mood' : `${username}'s Mood`"
      >
        <p class="whitespace-pre-line break-words">
          {{ moodRef.content }}
        </p>
      </div>
    </div>
    <div v-if="isSelf" class="form-control w-full">
      <label class="label cursor-pointer">
        <span class="label-text text-base">Make Public</span>
        <input
          v-model="moodRef.isPublic"
          type="checkbox"
          class="checkbox-primary checkbox"
          @change.prevent="handleDebouncedIsPublicChange"
        />
      </label>
    </div>
    <div v-if="isSelf" class="grid grid-cols-2 gap-2">
      <button
        v-if="editOffset"
        class="btn btn-neutral"
        @click.prevent="handleEditClose"
      >
        <i class="bx bx-x text-3xl"></i>
      </button>
      <button
        v-if="editOffset"
        class="btn btn-neutral"
        @click.prevent="handleEditSubmit"
      >
        <i class="bx bx-check text-3xl"></i>
      </button>
      <template v-else>
        <button class="btn-error btn" @click.prevent="handleDeleteStart">
          <i class="bx bx-trash text-2xl"></i>
        </button>
        <button class="btn btn-neutral" @click.prevent="handleEditStart">
          <i class="bx bx-edit-alt text-2xl"></i>
        </button>
      </template>
    </div>
    <div class="tooltip tooltip-primary hover:z-50" data-tip="Brewed On">
      <h3
        class="bg-base-200 font-code rounded p-1 text-xs font-bold shadow-2xl"
      >
        {{ parseDate(moodRef.createdAt) }}
      </h3>
    </div>
    <h3
      v-if="moodRef.isEdited || triggerEdited"
      class="bg-base-200 font-code rounded p-1 text-xs font-bold shadow-2xl"
    >
      edited
    </h3>
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
            class="btn btn-neutral normal-case"
            @click.prevent="handleDeleteClose"
          >
            No
          </button>
        </div>
      </div>
    </div>
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
  isPublic?: boolean;
  createdAt: Date;
  isEdited: Date;
}
interface IError extends FetchError {
  data: {
    success: boolean;
    error?: string;
    code: number;
  };
}

const props = defineProps<{
  isSelf: boolean;
  username?: string | string[];
  mood: IMood;
}>();

const emit = defineEmits(["success"]);

const editOffset = ref(false);
const deleteOffset = ref(false);
const deleteConfirm = ref(false);
const moodRef = ref(props.mood);
const triggerEdited = ref(false);
const send = ref({
  content: "",
});

function handleEditStart() {
  send.value.content = moodRef.value.content;
  editOffset.value = true;
}
function handleEditClose() {
  editOffset.value = false;
}
async function handleEditSubmit() {
  try {
    const value = await schema.parseAsync(send.value);
    await useAsyncData("update-mood", () =>
      $fetch(`/coffee/${moodRef.value.id}`, {
        method: "PATCH",
        credentials: "include",
        body: value,
      })
        .then(() => {
          moodRef.value.content = send.value.content;
          triggerEdited.value = true;
          emit("success", true);
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
        }),
    );
  } catch (error) {}
}

const handleDebouncedIsPublicChange = debounce(handleIsPublicChange, 500, {
  leading: true,
  trailing: true,
});

async function handleIsPublicChange() {
  await useAsyncData("update-is-public", () =>
    $fetch(`/coffee/${moodRef.value.id}`, {
      method: "PATCH",
      credentials: "include",
      body: {
        isPublic: moodRef.value.isPublic,
      },
    }),
  );
}
function handleDeleteStart() {
  deleteOffset.value = true;
}
function handleDeleteClose() {
  deleteOffset.value = false;
}
async function handleDeleteSubmit() {
  await useAsyncData("delete-mood", () =>
    $fetch(`/coffee/${moodRef.value.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        handleDeleteClose();
        deleteConfirm.value = true;
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
      }),
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
