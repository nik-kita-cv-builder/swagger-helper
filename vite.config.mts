Deno.writeTextFileSync(
  ".env",
  "\n\n" +
    Object.entries(Deno.env.toObject()).filter(([k]) => /VITE_/.test(k)).map((
      [k, v],
    ) => `${k}=${v}`).join("\n"),
  {
    append: true,
  },
);

import vue from "npm:@vitejs/plugin-vue@^4.5.2";
import { defineConfig } from "npm:vite@^5.0.10";

import "npm:@vueuse/core";
import "npm:vue3-google-signin";
import "npm:vue@^3.3.13";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
