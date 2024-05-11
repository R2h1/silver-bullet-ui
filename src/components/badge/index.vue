<template>
  <div class='example-wrap'>
    <Badge>这是一个 badge 组件</Badge>
  </div>
</template>

<script>
import Badge from "./badge.vue";

export default {
  components: {
    Badge,
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