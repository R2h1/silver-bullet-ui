<template>
  <span
      :style="styles" 
      :data-gradient="isGradient" 
      :data-inherit='inherit'
      :data-inline="inline"
      :data-line-clamp="isLineClamp"
      :class="`${prefixClass}`"
    ><slot></slot></span>
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
  name: 'sb-text',
  components: {
  },
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-text',
      parentNode: null,
    }
  },
  computed: {
    styles() {
      const style = {};
      if (this.lineClamp > 0) {
        style['--text-line-clamp'] = this.lineClamp;
      }
      // 设置行高
      if (this.verticalCenter) {
        style['--text-line-height'] = 1;
      } else {
        style['--text-line-height'] =  `${LINE_HEIGHT_MAP[this.size] || `${this.size}px`}`;
      }
      // 设置颜色
      if (this.variant === 'gradient') {
        const { from, to, deg } = this.gradient;
        style['--text-gradient'] = `linear-gradient(${deg}deg,  ${from} 0%, ${to} 100%)`;
      } else {
        style['--text-color'] = this.color;
        style['--text-decoration'] = this.decoration;
        style['--font-weight'] = this.weight;
      }
      // 设置文本大小
      style['--text-font-size'] = `${SIZE_MAP[this.size] || this.size}px`;
      style['--text-align'] = this.align;

      return style;
    },
    isGradient() {
      return this.variant === 'gradient'
    },
    isLineClamp() {
      return this.lineClamp > 0;
    },
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
