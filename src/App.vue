<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';
import { GoogleSignInButton, type CredentialResponse } from 'vue3-google-signin';


const source = ref('')
const { text, copy, copied, isSupported } = useClipboard({ source })
const handle_success = (res: CredentialResponse) => {
  source.value = res.credential ?? '';
}
</script>

<template>
  <div class="root">
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
