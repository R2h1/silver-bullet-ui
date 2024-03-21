<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';

const RADIUS_MAP = {
  'xs': 2,
  'sm': 4,
  'md': 8,
  'lg': 16,
  'xl': 32
}

const SIZE_MAP = {
  'xs': 18,
  'sm': 22,
  'md': 28,
  'lg': 34,
  'xl': 44
}

export default {
  name: 'yt-theme-icon',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-theme-icon',
    }
  },
  computed: {
    styles() {
      const style = {
        '--theme-icon-size': `${SIZE_MAP[this.size] || this.size}px`,
        '--theme-icon-color': this.color,
        '--theme-icon-bg-color': this.bgColor,
        '--theme-icon-radius': `${RADIUS_MAP[this.radius] || this.radius}px`,
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
