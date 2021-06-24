/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Zoom, ZoomOptions } from "medium-zoom";
import mediumZoom from "medium-zoom";
import type { App, Directive } from "vue-demi";
import { mediumZoomSymbol } from "./composables/index";
import { getSelectors, obMap } from "./utils/getSelectors";
import mitt from "mitt";
import { uuid } from "./utils/uuid";
import { EventKey, ObserverKey } from "./constants";
import arrayEqual from "array-equal";

export const emitter = mitt();

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

const el2zoomTargets = new WeakMap<
  HTMLElement,
  ReturnType<typeof getSelectors>
>();

const handleRegister = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions,
  zoom: Zoom | null
) => {
  if (!zoom || !el) return;

  const oldSelectors = el2zoomTargets.get(el) || [];
  const selectors = getSelectors(el, options.selector);

  // if zoom target not change, skip flowing operation
  const shouldUpdate = !arrayEqual<HTMLElement>(oldSelectors, selectors);
  if (!shouldUpdate) return;

  zoom.detach(oldSelectors);
  el2zoomTargets.set(el, selectors);
  zoom.attach(selectors);
};

const register = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions
) => {
  if (!el) return;
  if (!zoom) {
    zoom = createZoom(options);
  }
  handleRegister(el, options, zoom);

  const eventKey = uuid();
  el[EventKey] = eventKey;
  emitter.on(eventKey, () => {
    handleRegister(el, options, zoom);
  });
};

const unregister = (el: HTMLElement | null) => {
  if (!el) return;
  if (zoom) {
    const oldSelectors = el2zoomTargets.get(el) || [];
    zoom.detach(oldSelectors);
  }

  el2zoomTargets.delete(el);

  // stop listen update event
  const eventKey = el[EventKey];
  eventKey && emitter.off(eventKey); // clear all the handler in the name of [eventKey]
  delete el[EventKey];

  // stop observe element
  obMap.delete(el);
  const ob = el[ObserverKey];
  ob && ob.disconnect();
  delete el[ObserverKey];
};

const createDirectiveHooks = (
  options: VueImageViewerPluginOptions
): Directive & {
  inserted(el: any): void;
  unbind(el: any): void;
} => {
  return {
    inserted(el) {
      register(el, options);
    },
    unbind(el) {
      unregister(el);
    },
    mounted(el) {
      register(el, options);
    },
    beforeUnmount(el) {
      unregister(el);
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
