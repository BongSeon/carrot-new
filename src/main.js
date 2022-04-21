import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// global styles
import "./assets/normalize.css";
import "./assets/main.css";
import SlotHeader from "./components/global/SlotHeader.vue";

createApp(App)
  .use(store)
  .use(router)
  .component("slot-header", SlotHeader)
  .mount("#app");
