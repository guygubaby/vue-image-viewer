import {
  DEFAULT_SELECTOR,
  EventKey,
  observeConfig,
  ObserverKey,
} from "@/constants";
import { emitter } from "../index";
import debounce from "lodash.debounce";
import { nextTick } from "vue-demi";

export const getSelectors = (
  el: HTMLElement | null,
  selector = DEFAULT_SELECTOR
): HTMLElement[] | NodeList => {
  let res: HTMLElement[] | NodeList = [];

  if (el) {
    if (el.tagName === "IMG") {
      res = [el];
    } else {
      res = el.querySelectorAll(selector);
    }
  }

  // observe ele using mictotask defer task
  nextTick(() => {
    createObserver(el);
  });

  return res;
};

const debouncedEmitRegisterEvent = debounce(
  (eventKey: string | undefined) => {
    eventKey && emitter.emit(eventKey);
  },
  300,
  {
    trailing: true,
    leading: false,
  }
);

const obMap = new WeakMap<HTMLElement, 1>();

const createObserver = (el: HTMLElement | null) => {
  if (!el || obMap.has(el) || el[ObserverKey]) return;

  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  if (!MutationObserver) return;

  obMap.set(el, 1);

  const ob = new MutationObserver(() =>
    debouncedEmitRegisterEvent(el[EventKey])
  );
  ob.observe(el, observeConfig);
  el[ObserverKey] = ob;
};
