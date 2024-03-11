<template>
  <div :class="`${prefixClass}`" :data-inline="inline" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-center',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-center',
    }
  },
  computed: {
    styles() {
      const style = {};
      if (this.maw !== undefined) {
        style['max-width'] = `${this.maw}px`;
      }
      if (this.h !== undefined) {
         style['height'] = `${this.h}px`;
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
