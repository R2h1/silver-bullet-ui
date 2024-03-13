<template>
  <div class='example-wrap'>
    <LoadingOverlay />
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
  width: 516px;
  height: 200px;
  margin: 30px 0 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dee2e6;
}
</style>
