import {
  DEFAULT_SELECTOR,
  EventKey,
  observeConfig,
  ObserverKey,
} from '@/constants'
import debounce from 'lodash.debounce'
import { nextTick } from 'vue-demi'
import { emitter, el2zoomTargets } from '../index'

const debouncedEmitRegisterEvent = debounce(
  (eventKey: string | undefined) => {
    eventKey && emitter.emit(eventKey)
  },
  50,
  {
    leading: true,
    trailing: true,
  },
)

export const obMap = new WeakMap<HTMLElement, 1>()

const createObserver = (el: HTMLElement | null) => {
  if (!el || obMap.has(el) || el[ObserverKey]) return

  const MutationObserver
    = window.MutationObserver
    || window.WebKitMutationObserver
    || window.MozMutationObserver

  if (!MutationObserver) return

  obMap.set(el, 1)

  const ob = new MutationObserver(() => {
    const eventKey = el[EventKey]
    if (el2zoomTargets.has(el))
      debouncedEmitRegisterEvent(eventKey)
    else
      eventKey && emitter.emit(eventKey)
  })
  ob.observe(el, observeConfig)
  el[ObserverKey] = ob
}

export const getSelectors = (
  el: HTMLElement | null,
  selector = DEFAULT_SELECTOR,
): HTMLElement[] | NodeList => {
  let res: HTMLElement[] | NodeList = []

  if (el) {
    if (el.tagName === 'IMG')
      res = [el]
    else
      res = el.querySelectorAll(selector)
  }

  // async observe ele
  nextTick(() => {
    createObserver(el)
  })

  return res
}
