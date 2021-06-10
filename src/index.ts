import {
  IMAGE_SELECTOR,
  ZOOM_FLAG,
  OBSERVER_PLUGIN_FLAG,
  observeConfig,
  BASE_MEDIUM_ZOOM_OPTIONS,
} from "./constants/index";
import { nextTick } from "vue-demi";
import debounce from "lodash.debounce";
import mediumZoom, { ZoomOptions, Zoom } from "medium-zoom";
import type { Jobs, ViewerElType } from "./types/index";

const MutationObserver =
  window.MutationObserver ||
  window.WebKitMutationObserver ||
  window.MozMutationObserver;

let isFlushPending = false;
const taskQueue: Array<Jobs> = [];
const imageMap = new WeakMap<HTMLElement, Zoom>();

const queueJob = (job: Jobs) => {
  if (taskQueue.includes(job)) {
    return;
  }
  taskQueue.push(job);
  queueFlush();
};

const queueFlush = () => {
  if (isFlushPending) return;
  isFlushPending = true;
  nextTick(flushJobs);
};

const flushJobs = () => {
  isFlushPending = false;
  let job: (() => void) | undefined;
  while ((job = taskQueue.shift())) {
    if (job) {
      job();
    }
  }
};

const initZoom = (
  image: HTMLImageElement | null | undefined,
  options?: ZoomOptions
) => {
  if (!image || image.hasAttribute(ZOOM_FLAG) || imageMap.has(image)) return;
  const zoom = mediumZoom(image, options);
  imageMap.set(image, zoom);
  image.setAttribute(ZOOM_FLAG, ZOOM_FLAG);
};

const patchImage = (
  ele: HTMLElement | null,
  options: ZoomOptions = BASE_MEDIUM_ZOOM_OPTIONS
) => {
  if (!ele) return;

  if (ele.hasAttribute(ZOOM_FLAG) || imageMap.has(ele)) return;

  const job: Jobs = () => {
    if (ele.tagName === "IMG") {
      initZoom(ele as HTMLImageElement, options);
      return;
    }

    const images = ele.querySelectorAll(
      IMAGE_SELECTOR
    ) as NodeListOf<HTMLImageElement>;

    images.forEach((image) => {
      initZoom(image, options);
    });
  };
  queueJob(job);
};

const debouncedPatchImage = debounce(patchImage, 300, {
  leading: true,
  trailing: true,
});

export const viewer = (
  targetEl: ViewerElType,
  options: ZoomOptions = BASE_MEDIUM_ZOOM_OPTIONS
): void => {
  if (targetEl[OBSERVER_PLUGIN_FLAG]) return;

  patchImage(targetEl, { ...BASE_MEDIUM_ZOOM_OPTIONS, ...options });

  const patchObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const target = mutation.target as HTMLElement;
      debouncedPatchImage(target, options);
    });
  });

  patchObserver.observe(targetEl, observeConfig);

  targetEl[OBSERVER_PLUGIN_FLAG] = patchObserver;

  window.addEventListener("beforeunload", () => {
    patchObserver && patchObserver.disconnect();
  });
};
