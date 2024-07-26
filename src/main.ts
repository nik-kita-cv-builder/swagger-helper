import { createApp, nextTick, provide } from "vue";
import VueGoogleSignin from "vue3-google-signin";
import App from "./App.vue";
import "./style.css";
import { useClientId } from "./useClientId";

const clientId = new URLSearchParams(window.location.search).get("clientId") ||
  "NONE";
const clientIdComposable = useClientId();

if (!clientId) {
  console.error("Add '?clientId=...' to the URL.");
}

clientIdComposable.set(clientId);

createApp(App)
  .use(VueGoogleSignin, {
    clientId,
  })
  .mount("#app");
