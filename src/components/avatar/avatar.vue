<template>
  <div :class="`${prefixClass}`" :style="styles" :data-with-group="withGroup">
    <span v-if="!src" :class="`${prefixClass}__placeholder`">
      <slot>
        <AvatarDefault />
      </slot>
    </span>
    <img :class="`${prefixClass}__img`" v-else :src="src" :alt="alt"/>
  </div>
</template>

<script>
import props from "./props.js";
import { RADIUS_MAP } from "../../core";
import AvatarDefault from '../icons/avatar-default.vue'

const bgColorMap = {
  'filled': 0.7,
  'light': 0.2,
}

export default {
  name: "sb-avatar",
  props: {
    ...props,
  },
  components: {
    AvatarDefault,
  },
  data() {
    return {
      prefixClass: "sb-avatar",
      withGroup: false,
    };
  },
  computed: {
    styles() {
      const style = {
        "--avatar-radius": `${RADIUS_MAP[this.radius] || this.radius}${Number.isNaN(Number(this.radius)) ? '' : 'px'}`,
        "--avatar-color": this.variant === 'filled' ? 'white' : `${this.color}`,
        "--avatar-bg": this.variant === 'filled' ? this.color : this.hex2rgba(this.color, 0.2),
      };
      if (this.variant === 'outline') {
        style["--avatar-bd"] = `1px solid ${this.color}`;
        style["--avatar-bg"] = 'white';
      }
      return style;
    },
  },
  mounted() {
    if (this.$parent.name === 'sb-with-group') {
      this.withGroup = true;
    }
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
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
