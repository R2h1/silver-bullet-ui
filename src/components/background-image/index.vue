<template>
  <div class='example-wrap'>
    <BackgroundImage >这是一个 background-image标题</BackgroundImage>
  </div>
</template>

<script>
import BackgroundImage from "./background-image.vue";

export default {
  components: {
    BackgroundImage,
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
