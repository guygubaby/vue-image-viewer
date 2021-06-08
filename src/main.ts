import { createApp } from "vue";
import App from "./App.vue";
import {
  createVueImageViewerPlugin,
  VueImageViewerPluginOptions,
} from "./entry";
import vhCheck from "vh-check";

vhCheck();

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer",
};

const VueImageViewerPlugin = createVueImageViewerPlugin(options);

createApp(App).use(VueImageViewerPlugin).mount("#app");
