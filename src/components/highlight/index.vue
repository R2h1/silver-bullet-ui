<template>
  <div class='example-wrap'>
    <Highlight ></Highlight>
  </div>
</template>

<script>
import Highlight from "./highlight.vue";

export default {
  components: {
    Highlight
  },
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 278px;
  margin: 30px 0 10px 10px;
  display: flex;
  align-items: center;
}
</style>
