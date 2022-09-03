import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount("#app");
