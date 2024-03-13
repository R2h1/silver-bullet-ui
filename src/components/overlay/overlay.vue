<template>
  <div :class="`${prefixClass}`" :style="styles"></div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-overlay',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-overlay',
    }
  },
  computed: {
    styles() {
      const style = {
        '--overlay-z-index': this.zIndex
      }
      if (this.blur > 0) {
        style['--overlay-filter'] = `blur(${this.blur}px)`;
      } else if (typeof this.blur === 'string') {
        style['--overlay-filter'] = this.blur;
      }
      if (this.radius > 0) {
        style['--overlay-radius'] = `${this.radius}px`;
      } else if (typeof this.radius === 'string') {
        style['--overlay-radius'] = this.radius;
      }
      style['--overlay-bg'] = this.gradient || this.hex2rgba(this.color, this.backgroundOpacity);
      style.opacity = this.opacity;
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
