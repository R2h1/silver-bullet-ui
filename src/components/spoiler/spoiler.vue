<template>
  <div :class="`${prefixClass}`" :style="styles">
    <div
      v-if="!hideTrigger"
      :class="`${prefixClass}__trigger`"
      :data-position="position" 
      @click="toggleVisible">{{value ? hideLabel : showLabel}}</div>
    <div :class="`${prefixClass}__mask`" :data-visible="value || !showLabel"></div>
    <div ref='content' :style="`height: ${this.maxHeight}px`" :class="`${prefixClass}__content`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-spoiler',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-spoiler',
      showed: false,
    }
  },
  computed: {
    styles() {
      const style = {
        '--spoiler-transition-duration': `${this.transitionDuration}ms`,
        '--spoiler-mask-height': `${this.maskHeight}px`,
      }
      return style
    },
    hideTrigger() {
      if (!this.showLabel) {
        return true;
      }
      return this.showed && this.once;
    }
  },
  watch: {
    value: {
      handler(newValue) {
        const { content }= this.$refs;
        if (newValue) {
          content.style.height = 'auto';
          const height = content.offsetHeight;
          window.requestAnimationFrame(() =>{
            content.style.height = `${height}px`;
          });
          content.addEventListener('transitionend', this.setShowed());
        } else {
          content.style.height = `${this.maxHeight}px`;
        }
      },
    }
  },
  methods: {
    toggleVisible() {
      this.$emit('input', !this.value);
    },
    setShowed() {
      this.showed = true;
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
