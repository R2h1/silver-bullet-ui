<template>
  <div ref="root" :class="`${prefixClass}`" :data-orientation="orientation" :data-full-width="fullWidth">
    <span ref="indicator" :class="`${prefixClass}__indicator`" ></span>
    <div @click="handleClick($event, item, index)" :class="`${prefixClass}__item`" v-for="item, index in data" :key="getKey(item)" >
      <div v-if="withItemsBorders && index !== 0" :class="`${prefixClass}__border`"></div>
      <label ref="label" :class="`${prefixClass}__label`" >{{getLabel(item)}}</label>
    </div>
  </div>
</template>

<script>
import props from './props.js'

export default {
  name: 'yt-segmented-control',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-segmented-control',
      activeIndex: 0,
    }
  },
  methods: {
    getKey(item) {
      if (typeof item === 'string') {
        return item;
      } 
      if (val !== null && typeof item === 'object') {
        return item.value;
      }
    },
    getLabel(item) {
      if (this.isString(item)) {
        return item;
      }
      if (this.isObject(item)) {
        return item.label;
      }
    },
    isObject(val) {
      return val !== null && typeof val === 'object'
    },
    isString(val) {
      return typeof val === 'string';
    },
    handleClick($event, item, index) {
      console.error("handleClick", $event, item, index);
      const rootPadding = this.getRootPadding(this.$refs.root, 4);
      const element = this.$refs.label[index];
      const indicator = this.$refs.indicator;
      const offsetLeft= element.parentElement.offsetLeft - rootPadding.left;
      const elementRect = element.getBoundingClientRect();
      const scaledValue = element.offsetWidth / elementRect.width;
      const width = element.clientWidth * scaledValue || 0;
      const height = element.clientHeight * scaledValue || 0;
      indicator.style.setProperty('--indicator-width', `${width}px`);
      indicator.style.setProperty('--indicator-height', `${height}px`);
      indicator.style.setProperty('--indicator-transform', `translate(${offsetLeft}px, ${element.parentElement.offsetTop - rootPadding.top}px)`)
    },
    getRootPadding(root, defaultPaddingValue) {
      const computedStyle = window.getComputedStyle(root);
      return {
        top: this.getPaddingValue(computedStyle.getPropertyValue('padding-top'), defaultPaddingValue),
        right: this.getPaddingValue(computedStyle.getPropertyValue('padding-right'), defaultPaddingValue),
        bottom: this.getPaddingValue(computedStyle.getPropertyValue('padding-bottom'), defaultPaddingValue),
        left: this.getPaddingValue(computedStyle.getPropertyValue('padding-left'), defaultPaddingValue),
      };
    },
    getPaddingValue(value, defaultPaddingValue) {
      const val = parseFloat(value.replace('px', ''));
      return Number.isNaN(val) ? defaultPaddingValue : val;
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
