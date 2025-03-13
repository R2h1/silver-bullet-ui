<template>
  <div class="example-wrap">
    <AnimateNumber
      :start="0"
      :end="10000"
      :duration="2000"
      :decimals="2"
      easing="bounceOut"
    />
  </div>
</template>

<script>
import AnimateNumber from "./animate-number.vue";

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
