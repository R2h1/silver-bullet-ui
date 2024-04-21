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

export default {
  name: 'sb-timeline',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-timeline',
    }
  },
  computed: {
    styles() {
      const style = {
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
