import { createApp } from "vue";
import App from "./App.vue";
import {
  createVueImageViewerPlugin,
  VueImageViewerPluginOptions,
} from "./entry";

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer",
};

const VueImageViewerPlugin = createVueImageViewerPlugin(options);

createApp(App).use(VueImageViewerPlugin).mount("#app");
