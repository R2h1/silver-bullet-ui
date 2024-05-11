<template>
  <div class='example-wrap'>
    <Avatar>这是一个 avatar 组件</Avatar>
  </div>
</template>

<script>
import Avatar from "./avatar.vue";

export default {
  components: {
    Avatar,
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
