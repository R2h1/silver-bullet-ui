<template>
  <div class='example-wrap'>
    <img
        style="width: 100%; height: 100%;"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        alt="Demo"
    />
    <Overlay :blur="0" :backgroundOpacity="0.35"/>
  </div>
</template>

<script>
import Overlay from "./overlay.vue";

export default {
  components: {
    Overlay
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 278px;
  height: 156px;
  margin: 30px 0 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee2e6;
}
</style>
