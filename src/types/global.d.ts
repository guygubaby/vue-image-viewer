interface Window {
  readonly WebKitMutationObserver: MutationObserver;
  readonly MozMutationObserver: MutationObserver;
}

interface HTMLElement {
  __EventKey__?: string | undefined;
  __observer_key__?: MutationObserver | undefined;
}
