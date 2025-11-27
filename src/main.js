import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Examen from "./components/Examen.vue";
import Ejm_practico from "./components/Ejm_practico.vue";

createApp(App).use(router).mount("#app");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.getElementById("install-pwa-button");
  if (btn) btn.style.display = "block";
});

document.getElementById("install-pwa-button")?.addEventListener("click", () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  deferredPrompt.userChoice.then(() => {
    deferredPrompt = null;
    document.getElementById("install-pwa-button").style.display = "none";
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("SW registrado:", reg))
    .catch((err) => console.error("Error al registrar SW:", err));
}
