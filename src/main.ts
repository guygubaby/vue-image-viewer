import { createApp } from "vue";
import App from "./App.vue";
import { createPlugin } from "./index";
import type { VueImageViewerPluginOptions } from "./index";
import "element-plus/lib/theme-chalk/index.css";

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer",
  zoomOptions: {
    background: "#000",
    scrollOffset: 20,
  },
};

createApp(App).use(createPlugin(options)).mount("#app");
