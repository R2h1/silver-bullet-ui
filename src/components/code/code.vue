<template>
  <pre dir="ltr" v-if="block" :data-block="block" :class="`${prefixClass}`" :style="styles"><slot></slot></pre>
  <code v-else :class="`${prefixClass}`" :style="styles"><slot></slot></code>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-code',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-code',
    }
  },
  computed: {
    styles() {
      const style = {
        '--code-color': this.color,
        '--code-background-color': this.bgColor,
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
../../core/index.js