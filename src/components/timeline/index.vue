<template>
  <div class='example-wrap'>
    <Timeline />
  </div>
</template>

<script>
import Timeline from "./timeline.vue";

export default {
  components: {
    Timeline
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  margin: 30px 0 10px 10px;
}
</style>
