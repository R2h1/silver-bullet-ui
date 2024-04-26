<template>
  <ul :data-with-padding="withPadding" v-if="type === 'unordered'" :class="`${prefixClass}`" :style="styles">
    <slot ></slot>
  </ul>
  <ol :data-with-padding="withPadding" :class="`${prefixClass}`" :style="styles" v-else>
    <slot ></slot>
  </ol>
</template>

<script>
import props from './props.js';

const SIZE_MAP = {
  'xs': 12,
  'sm': 14,
  'md': 16,
  'lg': 18,
  'xl': 20
}

const LINE_HEIGHT_MAP = {
  'xs': 1.4,
  'sm': 1.45,
  'md': 1.55,
  'lg': 1.6,
  'xl': 1.65
}

export default {
  name: 'sb-list',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-list',
    }
  },
  computed: {
    styles() {
      const style = {
        '--list-font-size': `${SIZE_MAP[this.size] || SIZE_MAP.md}px`,
        '--list-line-height': `${LINE_HEIGHT_MAP[this.size] || SIZE_MAP.md}`
      }
      return style;
    },
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
