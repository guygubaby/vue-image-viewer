# vue-image-viewer

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
  createVueImageViewerPlugin,
  VueImageViewerPluginOptions
} from "vue-image-viewer-mz";

const options: VueImageViewerPluginOptions = {
  directiveName: "viewer"
};

const VueImageViewerPlugin = createVueImageViewerPlugin(options);

createApp(App).use(VueImageViewerPlugin).mount("#app");
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
