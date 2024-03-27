import { createApp } from "vue";
import VueGoogleSignin from "vue3-google-signin";
import App from "./App.vue";
import "./style.css";

const clientId = new URLSearchParams(window.location.search).get("clientId");

window.location.search = "";

if (!clientId) {
  console.error("Add '?clientId=...' to the URL.");
}

createApp(App)
  .use(VueGoogleSignin, {
    clientId,
  })
  .mount("#app");
