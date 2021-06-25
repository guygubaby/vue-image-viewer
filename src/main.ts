import { createApp } from "vue";
import App from "./App.vue";
import { createPlugin } from "./index";

import "element-plus/lib/theme-chalk/index.css";

createApp(App).use(createPlugin()).mount("#app");
