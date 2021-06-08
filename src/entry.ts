import type { ZoomOptions } from "medium-zoom";
import { App, isVue3, Directive } from "vue-demi";
import { viewer } from "./index";
import { OBSERVER_PLUGIN_FLAG } from "./constants/index";

export interface VueImageViewerPluginOptions extends ZoomOptions {
  directiveName?: string;
}

export interface VueImageViewerPlugin {
  options?: VueImageViewerPluginOptions;
  install(app: App): void;
}

const createDirectiveHooksV2 = (
  options?: VueImageViewerPluginOptions
): Directive & {
  inserted(el: any): void;
  update(el: any): void;
  unbind(el: any): void;
} => {
  return {
    inserted(el) {
      viewer(el, options);
    },
    update(el) {
      viewer(el, options);
    },
    unbind(el) {
      const ob: MutationObserver | undefined = el[OBSERVER_PLUGIN_FLAG];
      ob && ob.disconnect();
    },
  };
};

const createDirectiveHooksV3 = (
  options?: VueImageViewerPluginOptions
): Directive => {
  return {
    mounted(el) {
      viewer(el, options);
    },
    updated(el) {
      viewer(el, options);
    },
    beforeUnmount(el) {
      const ob: MutationObserver | undefined = el[OBSERVER_PLUGIN_FLAG];
      ob && ob.disconnect();
    },
  };
};

export function createVueImageViewerPlugin(
  options?: VueImageViewerPluginOptions
): VueImageViewerPlugin {
  let directive: Directive;
  if (isVue3) {
    directive = createDirectiveHooksV3(options);
  } else {
    directive = createDirectiveHooksV2(options);
  }

  const plugin: VueImageViewerPlugin = {
    options,
    install(app: App) {
      app.directive(options?.directiveName || "viewer", directive);
    },
  };

  return plugin;
}
