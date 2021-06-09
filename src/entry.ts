import type { ZoomOptions } from "medium-zoom";
import { App, isVue3, Directive } from "vue-demi";
import { viewer } from "./index";
import { OBSERVER_PLUGIN_FLAG } from "./constants/index";
import { ViewerElType } from "./types";

export interface VueImageViewerPluginOptions extends ZoomOptions {
  directiveName?: string;
}

export interface VueImageViewerPlugin {
  options?: VueImageViewerPluginOptions;
  install(app: App): void;
}

const unregister = (el: ViewerElType) => {
  const ob: MutationObserver | undefined = el[OBSERVER_PLUGIN_FLAG];
  ob && ob.disconnect();
};

const createDirectiveHooksV2 = (
  options?: VueImageViewerPluginOptions
): Directive & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inserted(el: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update?(el: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unbind(el: any): void;
} => {
  return {
    inserted(el) {
      viewer(el, options);
    },
    // update(el) {
    //   viewer(el, options);
    // },
    unbind(el) {
      unregister(el);
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
    // updated(el) {
    //   viewer(el, options);
    // },
    beforeUnmount(el) {
      unregister(el);
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
