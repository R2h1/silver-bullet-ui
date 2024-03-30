<template>
  <el-tooltip 
    :content="displayTipsText" 
    :disabled="isDisabledTooltip"
    :placement="tipPosition"
  >
    <span
      ref='text'
      :style="styles" 
      :data-gradient="isGradient" 
      :data-inherit='inherit'
      :data-inline="inline"
      :data-line-clamp="isLineClamp"
      :class="`${prefixClass}`"
      @mouseenter="handleMouseenter" 
    >
        <slot> {{ tipText }}</slot>
      </span>
  </el-tooltip>
</template>

<script>
import props from './props.js';
import { Tooltip as ElTooltip } from 'element-ui';

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
  name: 'yt-text',
  components: {
    ElTooltip
  },
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-text',
      parentNode: null,
      textWidth: 0,
      textOverflow: false,
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
    isDisabledTooltip() {
      return !this.showTips || !this.displayTipsText || !this.textOverflow;
    },
    displayTipsText() {
      return this.tipText || this.$slots.default[0].text || '';
    }
  },
  watch: {
  },
  methods: {
    handleMouseenter() {
      if (!this.showTips || !this.displayTipsText) {
        this.textOverflow = false;
        return;
      }
      const parent = this.$refs.text.parentElement.cloneNode(true);
      const text = parent.querySelector('.yt-text');
      parent.style.position = 'fixed';
      parent.style.left = '-9999px';
      parent.style.opacity = '0';
      text.style.display = this.inline ? 'inline' : 'block';
      const lineHeight = this.getPxValue(window.getComputedStyle(this.$refs.text).getPropertyValue('line-height'), 16);
      document.body.appendChild(parent);
      const textHeight = text.offsetHeight;
      document.body.removeChild(parent);
      if (textHeight > lineHeight * this.lineClamp) {
          this.textOverflow = true;
      } else {
        this.textOverflow = false;
      }
    },
    getPxValue(value, defaultPaddingValue) {
      const val = parseFloat(value.replace('px', ''));
      return Number.isNaN(val) ? defaultPaddingValue : val;
    },
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
