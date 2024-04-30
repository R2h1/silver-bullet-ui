<template>
  <h1 v-if="order === 1" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h1>
  <h2 v-else-if="order === 2" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h2>
  <h3 v-else-if="order === 3" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h3>
  <h4 v-else-if="order === 4" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h4>
  <h5 v-else-if="order === 5" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h5>
  <h6 v-else-if="order === 6" :data-with-line-clamp="lineClamp > 0" :class="`${prefixClass}`" :style="styles">
    <slot></slot>
  </h6>
</template>

<script>
import props from './props.js';

const SIZE_MAP = {
  h1: '34px',
  h2: '26px',
  h3: '22px',
  h4: '18px',
  h5: '16px',
  h6: '14px'
}

export default {
  name: 'sb-title',
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-title',
    }
  },
  computed: {
    styles() {
      const style = {
        '--title-text-wrap': this.textWrap,
        '--title-line-height': this.lineHeight,
        '--title-font-size': `${SIZE_MAP['h' + this.order]}`,
      }
      if (this.lineClamp > 0) {
        style['--title-line-clamp'] = this.lineClamp;
      }
      if (this.size) {
        style['--title-font-size'] = `${SIZE_MAP[this.size] || this.size}`
      } 
      return style;
    },
    lineHeight() {
      if (this.order !== 6) {
        return this.order * 0.05 + 1.25;
        
      }
      return 5 * 0.05 + 1.25;
    }
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
