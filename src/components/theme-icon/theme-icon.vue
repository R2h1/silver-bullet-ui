<template>
  <div :class="`${prefixClass}`" :style="styles">
    <slot />
  </div>
</template>

<script>
import props from './props.js';
import { RADIUS_MAP } from '../../core';

const SIZE_MAP = {
  'xs': 16,
  'sm': 20,
  'md': 26,
  'lg': 32,
  'xl': 42
}

export default {
  name: 'sb-theme-icon',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-theme-icon',
    }
  },
  computed: {
    styles() {
      const style = {
        '--theme-icon-size': `${SIZE_MAP[this.size] || this.size}px`,
        '--theme-icon-radius': `${RADIUS_MAP[this.radius] || this.radius}px`,
      }
      if (this.variant === 'light') {
        style['--theme-icon-bg-color'] = this.hex2rgba(this.color, 0.1);
        style['--theme-icon-color'] = this.color;
        style['--theme-icon-border'] = '1px solid transparent';
      } else if (this.variant === 'filled') {
        style['--theme-icon-bg-color'] = this.color;
        style['--theme-icon-color'] = 'rgb(255, 255, 255)';
        style['--theme-icon-border'] = '1px solid transparent';
      } else if (this.variant === 'outline') {
        style['--theme-icon-bg-color'] = 'rgb(255, 255, 255)';
        style['--theme-icon-color'] = this.color;
        style['--theme-icon-border'] = `1px solid ${this.color}`;
      } else if (this.variant === 'default') {
        style['--theme-icon-bg-color'] = 'rgb(255, 255, 255)';
        style['--theme-icon-color'] = '#212529';
        style['--theme-icon-border'] = '1px solid #ced4da';
      } else if (this.variant === 'white') {
        style['--theme-icon-bg-color'] = 'rgb(255, 255, 255)';
        style['--theme-icon-color'] = this.color;
        style['--theme-icon-border'] = '1px solid transparent';
      } else if (this.variant === 'gradient') {
        const { from, to, deg } = this.gradient;
        style['--theme-icon-color'] = 'rgb(255, 255, 255)';
        style['--theme-icon-bg-color'] = `linear-gradient(${deg}deg,  ${from} 0%, ${to} 100%)`;
        style['--theme-icon-border'] = '1px solid transparent';
      }
      return style;
    }
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    hex2rgba(hex, opacity) {
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
      if (!reg.test(hex)) {
        return hex;
      }
      let red = 0;
      let green = 0;
      let blue = 0;
      let aa = 0;
      let h = hex.substring(1);
      if (h.length === 3 || h.length === 4) h = [...h].map((x) => x + x).join('');
      const hexValues = h.split('').map((item) => {
        return parseInt(item, 16);
      });
      red = hexValues[0] * 16 + hexValues[1];
      green = hexValues[2] * 16 + hexValues[3];
      blue = hexValues[4] * 16 + hexValues[5];
      aa = hexValues[6] * 16 + hexValues[7];
      if (opacity) {
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      }
      return `rgba(${red}, ${green}, ${blue}, ${aa})`;
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
