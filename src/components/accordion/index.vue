<template>
  <div class='example-wrap'>
    <Accordion>这是一个 accordion 标题</Accordion>
  </div>
</template>

<script>
import Accordion from "./accordion.vue";

export default {
  components: {
    Accordion,
  },
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.example-wrap {
  width: 100%;
  padding: 20px;
  height: 1100px;
  display: block;
}
</style>
