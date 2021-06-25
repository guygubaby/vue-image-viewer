<template>
  <div class="app">
    <div class="image-item" v-for="image in imageList" :key="image.id">
      <!-- <img v-test :src="image.src" :alt="image.name" /> -->
      <ElImage v-viewer :src="image.src" :alt="image.name" fit="cover" />
    </div>
  </div>
  <p style="text-align: center">
    <ElButton type="primary" @click="handleAdd1">more images</ElButton>
    <ElButton type="info" @click="handleDel">del image</ElButton>
  </p>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { uuid } from "./utils/uuid";
import { getRandomImageSrc } from "./utils/random-image";
import { ElImage, ElButton } from "element-plus";
import { createDirective } from "./index";

export default defineComponent({
  name: "App",
  directives: {
    test: createDirective(),
  },
  components: {
    ElImage,
    ElButton,
  },
  setup() {
    const imageList = reactive(
      Array.from({ length: 10 }, () => {
        return {
          id: uuid(),
          name: uuid(),
          src: getRandomImageSrc(),
        };
      })
    );

    const handleAdd1 = () => {
      imageList.push({
        id: uuid(),
        name: uuid(),
        src: getRandomImageSrc(),
      });
    };

    const handleDel = () => {
      const length = imageList.length;
      const index = Math.floor(Math.random() * length);
      imageList.splice(index, 1);
    };

    return { imageList, handleAdd1, handleDel };
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 1rem 0.5rem;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(var(--cols, 2), 1fr);
}

@media screen and (max-width: 768px) {
  .app {
    --cols: 2;
  }
}

@media screen and (min-width: 1080px) {
  .app {
    --cols: 4;
  }
}

img,
.el-image {
  object-fit: cover;
  // max-width: calc(50vw - 4rem);
  height: 30vh;
  width: auto;
}

.image-item {
  text-align: center;
}
</style>
