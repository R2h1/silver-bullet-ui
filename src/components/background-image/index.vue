<template>
  <div class='example-wrap'>
    <BackgroundImage
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
        radius="sm"
      >
      <Center p="md">
        BackgroundImage component can be used to add any content on image. It is useful for hero
        headers and other similar sections
      </Center>

      </BackgroundImage>
  </div>
</template>

<script>
import BackgroundImage from "./background-image.vue";
import Center from "../center/";

export default {
  components: {
    BackgroundImage,
    Center
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.example-wrap {
  width: 340px;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
