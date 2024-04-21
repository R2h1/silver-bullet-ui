<template>
  <span :class="`${prefixClass}`" :style="styles" :data-type="type">
    <template v-if="type !== 'oval'">
      <span></span>
      <span></span>
      <span></span>
    </template>
  </span>
</template>

<script>
import props from './props.js';

const SIZE_MAP = {
  'xs': 18,
  'sm': 22,
  'md': 36,
  'lg': 44,
  'xl': 58
}

export default {
  name: 'sb-loader',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-loader',
    }
  },
  computed: {
    styles() {
      const style = {
        '--loader-size': `${SIZE_MAP[this.size] || this.size}px`,
        '--loader-color': this.color,
      }
      return style;
    },
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
