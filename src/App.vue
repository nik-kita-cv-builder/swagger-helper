<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";
import {
  GoogleSignInButton,
  type CredentialResponse,
  type ImplicitFlowSuccessResponse,
} from "vue3-google-signin";
import GoogleSignInCodeFlow from "./GoogleSignInCodeFlow.vue";
import InstructionCmp from "./InstructionCmp.vue";
import { useClientId } from "./useClientId";

const clientIdComposable = useClientId();

const clientId = clientIdComposable.get();

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });
const handle_success_credential = (res: CredentialResponse) => {
  source.value = res.credential ?? "";
};
const handle_success_code = (res: ImplicitFlowSuccessResponse) => {
  source.value = res.code;
};
const handle_fail = (res: unknown) => {
  let message =
    "...oops... something went wrong... maybe open console for details";

  try {
    message = JSON.stringify(res, null, 2);
  } catch {
    console.error(res);
  }

  source.value = message;
};
</script>

<template>
  <div v-if="clientId === 'NONE'">
    <InstructionCmp />
  </div>

  <div v-else class="root">
    <h1>{{ clientId }}</h1>
    <div>
      <pre>
        Using this button return you credential string from Google response.
      </pre>
      <GoogleSignInButton
        @success="handle_success_credential"
        @error="handle_fail"
      />
      <div v-if="isSupported">
        <button @click="copy(source)">
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </button>
      </div>
      <p v-else>
        Your browser does not support Clipboard API so copy and paste manually.
      </p>
      <p v-show="!copied" class="long-str-holder">{{ source }}</p>
    </div>
    <hr />
    <div>
      <pre>
        This one - code string from Google response.
      </pre>
      <GoogleSignInCodeFlow
        @success="handle_success_code"
        @fail="handle_fail"
      />
      <div v-if="isSupported">
        <button @click="copy(source)">
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </button>
      </div>
      <p v-else>
        Your browser does not support Clipboard API so copy and paste manually.
      </p>
      <p v-show="!copied" class="long-str-holder">{{ source }}</p>
    </div>
  </div>
</template>

<style>
.root {
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  gap: 2rem;
  padding-top: 5%;
  align-items: center;
}

.greeny {
  background-color: greenyellow;
}

.yellowy {
  background-color: yellow;
}

.pinky {
  background-color: pink;
}

pre {
  background-color: grey;
  color: white;
  padding: 10px;
}

.long-str-holder {
  width: 80%;
  height: 2rem;
  padding: 0.5rem;
  overflow-y: hidden;
  overflow-x: auto;
  border-radius: 0.3rem;
  text-wrap: nowrap;
  background-color: lightgrey;
  color: black;
}
</style>
