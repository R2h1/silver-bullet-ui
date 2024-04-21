<template>
  <div class='example-wrap'>
    <SbCode bgColor="#1864ab" color="white">{{codeContent}}</SbCode>
  </div>
</template>

<script>
import SbCode from "./code.vue";

export default {
  components: {
    SbCode
  },
  data() {
    return {
      codeContent: `React.createElement()`
    }
  },
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 523px;
  line-height: 24.8px;
  margin: 30px 0 10px 10px;
}
</style>
