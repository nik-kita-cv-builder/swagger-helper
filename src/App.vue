<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";
import {
  GoogleSignInButton,
  type CredentialResponse
} from "vue3-google-signin";
import { useClientId } from "./useClientId";

const clientIdComposable = useClientId();

const clientId = clientIdComposable.get();

const source = ref("");
const { text, copy, copied, isSupported } = useClipboard({ source });
const handle_success = (res: CredentialResponse) => {
  source.value = res.credential ?? "";
};
</script>

<template>
  <div v-if="clientId === 'NONE'">
    <h1>Google login for development purposes</h1>
    <h2>How it works?</h2>
    <ol>
      <li class="pinky">
        <p>
          Register this url in your Google Cloud Console app as allowed origin
        </p>
        <pre>https://cv-builder-swagger-helper.deno.dev</pre>
      </li>
      <li class="yellowy">
        <p>Navigate to this page from where you need (for example Swagger) with query param</p>
        <pre>{{"<ahref={`https://cv-builder-swagger-helper.deno.dev/?clientId=\${config.VITE_GOOGLE_CLIENT_ID}`}>Sign-in with google</ahref=>`"}}</pre>
        <p>P.S.</p>
        <p>Example above use jsx syntax</p>
      </li>
      <li class="greeny">
        <p>After success login the Copy button will appear with your credential/code from Google</p>
      </li>
    </ol>
  </div>
  <div v-else class="root">
    <h1>{{ clientId }}</h1>
    <div>
      <pre>
        Using this button return you credential string from Google response.
      </pre>
      <GoogleSignInButton @success="handle_success" />
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
      <button @success="handle_success">Sign in with google</button>
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

<style scoped>
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
  padding: 10px
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
