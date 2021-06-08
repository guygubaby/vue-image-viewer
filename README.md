# vue-image-viewer

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

### App.vue

```html
<img v-viewer src="fake src" alt="fake name" />
<!-- or -->
<div v-viewer>
  <img src="fake src" alt="fake name" />
  <img src="fake src" alt="fake name" />
</div>
```
