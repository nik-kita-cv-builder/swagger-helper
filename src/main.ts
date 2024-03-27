import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueGoogleSignin from "vue3-google-signin";

console.log(import.meta.env)

createApp(App)
  .use(VueGoogleSignin, {
    clientId: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
  })
  .mount("#app");
