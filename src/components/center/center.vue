<template>
  <div :class="`${prefixClass}`" :data-inline="inline" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
import { PADDING_MAP } from '../../core';
import props from './props.js';

export default {
  name: 'sb-center',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-center',
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
      if (this.p !== undefined) {
        style.padding = `${PADDING_MAP[this.p] || this.p}px`;
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
