<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-timeline',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-timeline',
    }
  },
  computed: {
    styles() {
      const style = {
      }
      return style;
    }
  },
  mounted() {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
