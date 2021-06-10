/* eslint-disable @typescript-eslint/no-explicit-any */
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
  inserted(el: any): void;
  update?(el: any): void;
  unbind(el: any): void;
} => {
  return {
    inserted(el) {
      viewer(el, options);
    },
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
    beforeUnmount(el) {
      unregister(el);
    },
  };
};

export const createDirective = (
  options?: VueImageViewerPluginOptions
): Directive => {
  const directive: Directive = isVue3
    ? createDirectiveHooksV3(options)
    : createDirectiveHooksV2(options);
  return directive;
};

export function createVueImageViewerPlugin(
  options?: VueImageViewerPluginOptions
): VueImageViewerPlugin {
  const directive: Directive = createDirective(options);

  const plugin: VueImageViewerPlugin = {
    options,
    install(app: App) {
      app.directive(options?.directiveName || "viewer", directive);
    },
  };

  return plugin;
}
