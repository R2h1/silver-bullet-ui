<template>
  <div :class="`${prefixClass}`" :style="styles" >
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';
import { RADIUS_MAP, PADDING_MAP } from "../../core";

export default {
  name: 'sb-background-image',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-background-image',
    }
  },
  computed: {
    styles() {
      const style = {
        '--bi-radius': `${RADIUS_MAP[this.radius] || this.radius}px`,
      }
      if (this.src) {
        style['background-image'] = `url(${this.src})`;
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
