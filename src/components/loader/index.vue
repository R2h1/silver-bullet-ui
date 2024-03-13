<template>
  <div class='example-wrap'>
    <Loader :size="24"/>
  </div>
</template>

<script>
import Loader from "./loader.vue";

export default {
  components: {
    Loader
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
