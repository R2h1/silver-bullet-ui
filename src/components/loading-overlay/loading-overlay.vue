<template>
  <div v-if="visible" :class="`${prefixClass}`" :style="styles">
    <loader :style="`position: relative; z-index: calc(var(--loading-overlay-z-index) + 1)`" v-bind="{ ...loaderProps }"></loader>
    <overlay  v-bind="overlayProps"/>
  </div>
</template>

<script>
import Loader from '../loader';
import Overlay from '../overlay';

import props from './props.js';

export default {
  name: 'yt-loading-overlay',
  components: {
    Overlay,
    Loader
  },
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-loading-overlay',
    }
  },
  computed: {
    styles() {
      const style = {
        '--loading-overlay-z-index': this.zIndex
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
