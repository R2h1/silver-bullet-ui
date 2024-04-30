<template>
  <div :class="`${prefixClass}`" :style="styles" >
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-accordion',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-accordion',
    }
  },
  computed: {
    styles() {
      const style = {

      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
