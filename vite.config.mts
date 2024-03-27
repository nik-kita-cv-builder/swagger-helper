import { defineConfig } from "npm:vite@^5.0.10";
import vue from "npm:@vitejs/plugin-vue@^4.5.2";

import "npm:vue@^3.3.13";
import "npm:vue3-google-signin";
import "npm:@vueuse/core";

if (!import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID) {
  (import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID as unknown as string) = Deno.env
    .get("VITE_GOOGLE_OAUTH2_CLIENT_ID") ?? "...ooops";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
