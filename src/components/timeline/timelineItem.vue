<template>
  <div :class="`${prefixClass}`" :style="styles">
    <slot />
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-timeline-item',
  props: { 
    title: {
      type: String,
    } 
  },
  data() {
    return {
      prefixClass: 'sb-timeline-item',
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
