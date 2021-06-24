import { DEFAULT_SELECTOR } from "@/constants";
import type { ZoomSelector } from "medium-zoom";

export const getSelectors = (
  el: HTMLElement | null,
  selector = DEFAULT_SELECTOR
): ZoomSelector => {
  let res: ZoomSelector = [];
  if (el) {
    if (el.tagName === "IMG") {
      res = el;
    } else {
      res = el.querySelectorAll(selector);
    }
  }
  return res;
};
