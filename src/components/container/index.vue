<template>
  <div class='example-wrap'>
    <container :h="50" bg="rgba(34, 139, 230, .1)"> 
      30rem Container without padding
    </container>
  </div>
</template>

<script>
import Container from "./container.vue";

export default {
  components: {
    Container,
  }
}
</script>

<style scoped>
.example-wrap {
  width: 516px;
  display: block;
}
</style>
