<template>
  <div :class="`${prefixClass}`" :data-fluid="fluid" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-container',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-container',
    }
  },
  computed: {
    styles() {
      const style = {};
      if (this.bg !== undefined) {
        style.backgroundColor = `${this.bg}`;
      }
      if (this.h !== undefined) {
        style['height'] = `${this.h}px`;
      }
      style['padding-inline'] = `${this.px}px`;
      if (this.fluid) {
        return style;
      }
      if (this.size !== undefined) {
        style['max-width'] = `${this.size}px`;
        style['margin-inline'] = 'auto';
      } else {
        style['max-width'] = '916px';
      }
      return style;
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
