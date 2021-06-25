# vue-image-viewer 🎉

[live demo](https://guygubaby.github.io/vue-image-viewer/)

## brief intro

A image viewer for both vue2 and vue3 using [medium-zoom](https://www.npmjs.com/package/medium-zoom)

## install

```bash
yarn add vue-image-viewer-mz
# or
npm i vue-image-viewer-mz
```

## usage

### main.ts

```ts
// entry point of your vue app
import { createApp } from "vue";
import App from "./App.vue";
import {
  createPlugin as createVueImageViewerPlugin,
  VueImageViewerPluginOptions
} from "vue-image-viewer-mz";

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer"
};

createApp(App).use(createVueImageViewerPlugin(options)).mount("#app");
```

### or in component directive

```html
<template>
  <img v-viewer-in-component src="fake src" alt="fake name" />
</template>

<script>
  import { createDirective as createVueImageViewerDirective } from "vue-image-viewer-mz";
  import { defineComponent } from "vue";

  export default defineComponent({
    directives: {
      "viewer-in-component": createVueImageViewerDirective()
    }
  });
</script>
```

### App.vue

```html
<img v-viewer src="fake src" alt="fake name" />
<!-- or -->
<div v-viewer>
  <img src="fake src" alt="fake name" />
  <img src="fake src" alt="fake name" />
</div>
```

### Composition API

Only works when you use as a `plugin` in your `main.ts`

#### useMediumZoom

```js
import { nextTick } from "vue";
import { useMediumZoom } from "vue-image-viewer-mz";

export default {
  setup() {
    // ... do something to add new images in current page
    const zoom = useMediumZoom();
    // you can get the zoom instance here
  }
};
```
