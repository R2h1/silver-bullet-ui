<template>
  <div :class="`${prefixClass}`" :style="styles">
    <div :class="`${prefixClass}__section`" :data-striped="animated || striped" :data-animated="animated"></div>
    <span class="percentage" >{{percentage}}</span>
  </div>
</template>

<script>
import props from './props.js';
import { RADIUS_MAP } from '../../core';

const SIZE_MAP = {
  'xs': 3,
  'sm': 5,
  'md': 8,
  'lg': 12,
  'xl': 16
}

export default {
  name: 'sb-progress',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-progress',
    }
  },
  computed: {
    styles() {
      const style = {
        '--progress-size': `${SIZE_MAP[this.size] || this.size}px`,
        '--progress-radius': `${RADIUS_MAP[this.radius] || this.radius}px`,
        '--progress-section-color': this.color,
        '--progress-section-width': `${this.value}%`,
        '--progress-label-color': this.labelColor,
        '--progress-track-color': this.trackColor
      }
      return style;
    },
    percentage() {
      let per = this.value;
      if (this.value < 0) {
        per = 0;
      }
      if (this.value > 100) {
        per = 100;
      }
      return `${per}%`;
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
