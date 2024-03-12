<template>
  <div 
    ref="root" 
    :class="`${prefixClass}`" 
    :data-orientation="direction" 
    :data-with-label="!!$slots.default" 
    :style="styles">
    <span :class="[`${prefixClass}__label`, {
      'is-vertical': direction === 'vertical'
    }]" v-if="!!$slots.default" >
      <span :class="[`${prefixClass}__before`, {
      'is-vertical': direction === 'vertical'
    }]" v-if="labelPosition !== 'left'"></span>
      <slot />
      <span :class="[`${prefixClass}__after`, {
      'is-vertical': direction === 'vertical'
    }]" v-if="labelPosition !== 'right'"></span>
    </span>
  </div>
</template>

<script>
import props from './props.js';

const SIZE_MAP = {
  'xs': 1,
  'sm': 2,
  'md': 3,
  'lg': 4,
  'xl': 5
}

export default {
  name: 'yt-my-divider',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-my-divider',
    }
  },
  computed: {
    styles() {
      const style = {
        '--divider-size': `${SIZE_MAP[this.size] || this.size }px`,
        '--divider-border-style': `${this.variant}`,
        '--divider-color': `${this.color}`,
      }
      return style;
    },
    direction() {
      return this.orientation
    }
  },
  mounted() {
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
