interface Window {
  readonly WebKitMutationObserver: MutationObserver
  readonly MozMutationObserver: MutationObserver
}

interface HTMLElement {
  __EventKey__?: string | undefined
  __observer_key__?: MutationObserver | undefined
}

declare module 'array-equal' {
  export default function <T>(
    arr1: NodeList | T[],
    arr2: NodeList | T[]
  ): boolean
}
