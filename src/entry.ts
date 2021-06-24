/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Zoom, ZoomOptions } from "medium-zoom";
import mediumZoom from "medium-zoom";
import type { App, Directive } from "vue-demi";
import { nextTick } from "vue-demi";
import { mediumZoomSymbol } from "./composables/index";
import { getSelectors } from "./utils/getSelectors";

export interface VueImageViewerPluginOptions extends MediumZoomPluginOptions {
  directiveName?: string;
}

export interface VueImageViewerPlugin {
  options?: VueImageViewerPluginOptions;
  install(app: App): void;
}

export interface MediumZoomPluginOptions {
  selector?: string;
  zoomOptions?: ZoomOptions;
}

const createZoom = (options: MediumZoomPluginOptions): Zoom => {
  return mediumZoom(options.zoomOptions);
};

let zoom: Zoom | null = null;

const register = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions
) => {
  if (!el) return;
  const selectors = getSelectors(el, options.selector);
  if (!zoom) {
    zoom = createZoom(options);
  }
  zoom.attach(selectors);
};

const unregister = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions
) => {
  if (!el) return;
  if (zoom) {
    const selectors = getSelectors(el, options.selector);
    zoom.detach(selectors);
  }
};

const createDirectiveHooks = (
  options: VueImageViewerPluginOptions
): Directive & {
  inserted(el: any): void;
  unbind(el: any): void;
} => {
  return {
    inserted(el) {
      nextTick(() => {
        register(el, options);
      });
    },
    unbind(el) {
      unregister(el, options);
    },
    mounted(el) {
      nextTick(() => {
        register(el, options);
      });
    },
    beforeUnmount(el) {
      unregister(el, options);
    },
  };
};

export const createDirective = (
  options: VueImageViewerPluginOptions
): Directive => {
  return createDirectiveHooks(options);
};

export function createPlugin(
  options: VueImageViewerPluginOptions
): VueImageViewerPlugin {
  const directive: Directive = createDirectiveHooks(options);

  if (!zoom) {
    zoom = createZoom(options);
  }

  const plugin: VueImageViewerPlugin = {
    options,
    install(app: App) {
      app.directive(options?.directiveName || "viewer", directive);
      app.provide(mediumZoomSymbol, zoom);
    },
  };

  return plugin;
}
