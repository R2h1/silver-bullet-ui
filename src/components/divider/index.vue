<template>
  <div class='example-wrap'>
    <p>111111</p>
    <divider orientation="vertical" labelPosition="center" size="lg" >垂直方向</divider>
    <p>222</p>
  </div>
</template>

<script>
import Divider from "./divider.vue";

export default {
  components: {
    Divider
  }
}
</script>

<style scoped>
.example-wrap {
  width: 516px;
  height: 120px;
  display: flex;
  align-items: center;
}
</style>
