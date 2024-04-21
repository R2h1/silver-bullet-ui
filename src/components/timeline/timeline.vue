<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';
import { RADIUS_MAP } from '../../core';

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
