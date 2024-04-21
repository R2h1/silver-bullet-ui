<template>
  <span :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </span>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-mark',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-mark',
    }
  },
  computed: {
    styles() {
      const style = {
        '--mark-background-color': this.bgColor,
        '--mark-color': this.color
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
