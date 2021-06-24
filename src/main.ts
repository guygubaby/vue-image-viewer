import { createApp } from "vue";
import App from "./App.vue";
import { createPlugin, VueImageViewerPluginOptions } from "./index";
import vhCheck from "vh-check";
import "element-plus/lib/theme-chalk/index.css";

vhCheck();

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer",
  zoomOptions: {
    background: "#000",
  },
};

createApp(App).use(createPlugin(options)).mount("#app");
