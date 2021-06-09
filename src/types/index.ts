import { OBSERVER_PLUGIN_FLAG } from "@/constants";

export type Jobs = () => void;

export type ViewerElType = HTMLElement & {
  [OBSERVER_PLUGIN_FLAG]: MutationObserver;
};
