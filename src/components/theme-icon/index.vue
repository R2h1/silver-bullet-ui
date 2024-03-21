<template>
  <div class='example-wrap'>
    <ThemeIcon />
  </div>
</template>

<script>
import ThemeIcon from "./theme-icon.vue";

export default {
  components: {
    ThemeIcon
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  margin: 30px 0 10px 10px;
}
</style>
