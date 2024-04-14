<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-mark',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-mark',
    }
  },
  computed: {
    styles() {
      const style = {
      }
      return style
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
