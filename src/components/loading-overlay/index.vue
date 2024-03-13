<template>
  <div class='example-wrap'>
      <img
        style="width: 100%; height: 100%;"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
        alt="Demo"
    />
    <LoadingOverlay :visible="true" :overlayProps="{ radius: 4, blur: 2 }"/>
  </div>
</template>

<script>
import LoadingOverlay from "./loading-overlay.vue";

export default {
  components: {
    LoadingOverlay
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 400px;
  height: 403px;
  margin: 30px 0 10px 10px;
  background-color: #dee2e6;
}
</style>
