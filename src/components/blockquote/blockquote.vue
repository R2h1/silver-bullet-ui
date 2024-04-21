<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-blockquote',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-blockquote',
    }
  },
  computed: {
    styles() {
      const style = {
        
      }
      return style;
    },
  },
  mounted() {
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
