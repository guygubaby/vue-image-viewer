import { createApp } from "vue";
import App from "./App.vue";
import { createPlugin, VueImageViewerPluginOptions } from "./index";
import vhCheck from "vh-check";

vhCheck();

const options: VueImageViewerPluginOptions = {
  selector: "img",
  directiveName: "viewer",
  zoomOptions: {
    background: "#000",
  },
};

createApp(App).use(createPlugin(options)).mount("#app");
