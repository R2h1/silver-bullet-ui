<template>
  <div class='example-wrap'>
    <Mark ></Mark>
  </div>
</template>

<script>
import Mark from "./mark.vue";

export default {
  components: {
    Mark
  },
  data() {
    return {
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
