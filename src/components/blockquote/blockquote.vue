<template>
  <blockquote :class="`${prefixClass}`" :style="styles">
    <span :class="`${prefixClass}__icon`">
      <slot name="icon"></slot>
    </span>
    <slot name="default"></slot>
    <cite :class="`${prefixClass}__cite`">
      <slot name="cite"></slot>
    </cite>
  </blockquote>
</template>

<script>
import props from "./props.js";
import { RADIUS_MAP } from "../../core";

const ICON_SIZE_MAP = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 56,
  xl: 64,
};

export default {
  name: "sb-blockquote",
  props: {
    ...props,
  },
  data() {
    return {
      prefixClass: "sb-blockquote",
    };
  },
  computed: {
    styles() {
      const style = {
        "--blockquote-radius": `${RADIUS_MAP[this.radius] || this.radius}px`,
        "--blockquote-icon-size": `${
          ICON_SIZE_MAP[this.iconSize] || this.iconSize
        }px`,
        "--blockquote-border-color": this.color,
        "--blockquote-background-color": this.hex2rgba(this.color, 0.07),
      };
      return style;
    },
  },
  methods: {
    hex2rgba(hex, opacity) {
      const reg =
        /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
      if (!reg.test(hex)) {
        return hex;
      }
      let red = 0;
      let green = 0;
      let blue = 0;
      let aa = 0;
      let h = hex.substring(1);
      if (h.length === 3 || h.length === 4)
        h = [...h].map((x) => x + x).join("");
      const hexValues = h.split("").map((item) => {
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
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
