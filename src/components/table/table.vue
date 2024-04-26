<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-table',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-table',
    }
  },
  computed: {
    styles() {
      const style = {
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
