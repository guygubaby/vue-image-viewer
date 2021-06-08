<template>
  <div class="app">
    <div class="image-item" v-for="image in imageList" :key="image.id">
      <img v-viewer :src="image.src" :alt="image.name" />
    </div>
  </div>

  <button @click="handleAdd1">more images</button>
  <button @click="handleDel">del image</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { uuid } from "./utils/uuid";
import { getRandomImageSrc } from "./utils/random-image";

export default defineComponent({
  name: "App",
  setup() {
    const imageList = reactive(
      Array.from({ length: 1 }, () => {
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
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 auto;
  width: 1200px;
}

img {
  object-fit: cover;
}

.image-item {
  & + .image-item {
    margin-left: 1rem;
  }
}
</style>
