<template>
  <div class='example-wrap'>
    <Progress size="xl" :value="value"/>
  </div>
</template>

<script>
import Progress from "./progress.vue";

export default {
  components: {
    Progress
  },
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    const animateFn = () => {
      this.value = this.value + 1;
      if (this.value < 100) {
        window.requestAnimationFrame(animateFn);
      }
    }
    window.requestAnimationFrame(animateFn)
  }
}
</script>

<style scoped>
.example-wrap {
  position: relative;
  width: 278px;
  height: 156px;
  margin: 30px 0 10px 10px;
  display: flex;
  align-items: center;
}
</style>
