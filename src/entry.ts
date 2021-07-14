/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Zoom, ZoomOptions } from 'medium-zoom'
import type { App, Directive } from 'vue-demi'

import mediumZoom from 'medium-zoom'
import mitt from 'mitt'
import arrayEqual from 'array-equal'
import { isVue2 } from 'vue-demi'

import { mediumZoomSymbol } from './composables/index'
import { getSelectors, obMap } from './utils/getSelectors'
import { uuid } from './utils/uuid'
import { DefaultZoomConfig, EventKey, ObserverKey } from './constants'

type AppType<T extends boolean> = T extends true ? any : App

export const emitter = mitt()

export interface MediumZoomPluginOptions {
  selector?: string
  zoomOptions?: ZoomOptions
}

export interface VueImageViewerPluginOptions extends MediumZoomPluginOptions {
  directiveName?: string
}

export interface VueImageViewerPlugin {
  options?: VueImageViewerPluginOptions
  install(app: AppType<typeof isVue2>): any
}

const createZoom = (options: MediumZoomPluginOptions): Zoom => {
  return mediumZoom(options.zoomOptions)
}

let zoom: Zoom | null = null

export const el2zoomTargets = new WeakMap<
HTMLElement,
ReturnType<typeof getSelectors>
>()

const handleRegister = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions,
  zoom: Zoom | null,
) => {
  if (!zoom || !el) return
  const oldSelectors = el2zoomTargets.get(el) || []
  const selectors = getSelectors(el, options.selector)

  // if zoom target not change, skip flowing operation
  const shouldUpdate = !arrayEqual<HTMLElement>(oldSelectors, selectors)

  if (!shouldUpdate) return

  zoom.detach(oldSelectors)
  el2zoomTargets.set(el, selectors)
  zoom.attach(selectors)
}

const register = (
  el: HTMLElement | null,
  options: VueImageViewerPluginOptions,
) => {
  if (!el) return
  if (!zoom)
    zoom = createZoom(options)

  handleRegister(el, options, zoom)

  const eventKey = uuid()
  el[EventKey] = eventKey
  emitter.on(eventKey, () => {
    handleRegister(el, options, zoom)
  })
}

const unregister = (el: HTMLElement | null) => {
  if (!el) return
  if (zoom) {
    const oldSelectors = el2zoomTargets.get(el) || []
    zoom.detach(oldSelectors)
  }

  el2zoomTargets.delete(el)

  // stop listen update event
  const eventKey = el[EventKey]
  eventKey && emitter.off(eventKey) // clear all the handler in the name of [eventKey]
  delete el[EventKey]

  // stop observe element
  obMap.delete(el)
  const ob = el[ObserverKey]
  ob && ob.disconnect()
  delete el[ObserverKey]
}

const createDirectiveHooks = (
  options: VueImageViewerPluginOptions,
): Directive & {
    inserted(el: any): void
    unbind(el: any): void
  } => {
  return {
    inserted(el) {
      register(el, options)
    },
    unbind(el) {
      unregister(el)
    },
    mounted(el) {
      register(el, options)
    },
    beforeUnmount(el) {
      unregister(el)
    },
  }
}

export const createDirective = (
  options: VueImageViewerPluginOptions = DefaultZoomConfig,
): Directive => {
  return createDirectiveHooks(options)
}

export function createPlugin(
  options: VueImageViewerPluginOptions = DefaultZoomConfig,
): VueImageViewerPlugin {
  const directive: Directive = createDirectiveHooks(options)

  if (!zoom)
    zoom = createZoom(options)

  const plugin: VueImageViewerPlugin = {
    options,
    install(app: AppType<typeof isVue2>) {
      app.directive(options.directiveName || 'viewer', directive)
      if (!isVue2)
        app.provide(mediumZoomSymbol, zoom)
    },
  }

  return plugin
}
