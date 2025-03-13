<template>
  <div class="example-wrap">
    <AnimateNumber>这是一个 animateNumber 组件</AnimateNumber>
  </div>
</template>

<script>
import AnimateNumber from "./animateNumber.vue";

export default {
  components: {
    AnimateNumber,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
