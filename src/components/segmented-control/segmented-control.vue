<template>
  <div v-if="data.length" ref="root" :class="[`${prefixClass}`, {
    disabled: disabled,
  }]" :data-orientation="orientation" :data-full-width="fullWidth">
    <span ref="indicator" :class="`${prefixClass}__indicator`" ></span>
    <div 
      :class="`${prefixClass}__item`" 
      v-for="item, index in list" :key="item.value"
      @click="handleClick(item, index, $event)"
      :data-active="activeIndex === index"
    >
      <span v-if="withItemsBorders && index !== 0" :class="[`${prefixClass}__border`, {
        active: [activeIndex, activeIndex + 1].includes(index),
        vertical: orientation === 'vertical',
      }]"></span>
      <label ref="label" :class="[`${prefixClass}__label`, {
        active: activeIndex === index,
        disabled: disabled || item.disabled
      }]" >{{item.label}}</label>
    </div>
  </div>
</template>

<script>
import props from './props.js';

const DEFAULT_PADDING = 4;
const RADIUS_MAP = {
  'xs': 2,
  'sm': 4,
  'md': 8,
  'lg': 16,
  'xl': 32
}
const PADDING_MAP = {
  'xs': '3px 6px' ,
  'sm': '5px 10px',
  'md': '7px 14px',
  'lg': '9px 16px',
  'xl': '12px 20px'
}

export default {
  name: 'sb-segmented-control',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-segmented-control',
      list: this.data.map(item => {
        if (typeof item === 'string') {
          return { label: item, value: item }
        }
        return item;
      }),
      activeIndex: 0,
    }
  },
  mounted() {
    this.setColor();
    this.setRadius(); 
    this.setPadding();
    this.setActiveIndex();
    this.setIndicatorPosition(this.activeIndex);
  },
  watch: {
    fullWidth() {
      this.propUpdate();
    },
    orientation() {
      this.propUpdate();
    },
    radius() {
      this.setRadius();
    },
    size() {
      this.propUpdate();
      this.setPadding();
    },
    color() {
      this.setColor();
    },
    data: {
      handler(newVal) {
        this.list = newVal.map(item => {
          if (typeof item === 'string') {
            return { label: item, value: item }
          }
          return item;
        });
        this.setActiveIndex();
        this.setIndicatorPosition(this.activeIndex);
      },
      deep: true,
    }
  },
  methods: {
    handleClick(item, index, $event) {
      if (this.disabled || item.disabled) {
        return;
      }
      this.activeIndex = index;
      this.setIndicatorPosition(this.activeIndex);
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
    },
    setIndicatorPosition(activeIndex) {
      const labelEl = this.$refs.label[activeIndex];
      const indicator = this.$refs.indicator;
      const rootPadding = this.getRootPadding(this.$refs.root, DEFAULT_PADDING);
      const offsetLeft= labelEl.parentElement.offsetLeft - rootPadding.left;
      const offsetTop = labelEl.parentElement.offsetTop - rootPadding.top;
      const labelElRect = labelEl.getBoundingClientRect();
      const scaledValue = labelEl.offsetWidth / labelElRect.width;
      const width = labelEl.clientWidth * scaledValue || 0;
      const height = labelEl.clientHeight * scaledValue || 0;
      indicator.style.setProperty('--indicator-width', `${width}px`);
      indicator.style.setProperty('--indicator-height', `${height}px`);
      indicator.style.setProperty('--indicator-transform', `translate(${offsetLeft}px, ${offsetTop}px)`);
    },
    setRadius() {
      const root = this.$refs.root;
      const radius = RADIUS_MAP[this.radius];
      if (radius) { // 非数字值
        root.style.setProperty('--sc-border-radius', `${RADIUS_MAP[this.radius]}px`);
        return;
      }
      // 数字值
      root.style.setProperty('--sc-border-radius', `${this.radius}px`);
      
    },
    setPadding() {
      const root = this.$refs.root;
      root.style.setProperty('--sc-padding', `${PADDING_MAP[this.size]}`);
    },
    setColor() {
      if (this.disabled) {
        return;
      }
      if (this.color !== 'white') {
        const root = this.$refs.root;
        root.style.setProperty('--sc-active-color', 'white');
        root.style.setProperty('--indicator-bg-color', this.color);
      }
    },
    setActiveIndex() {
      if (this.disabled) {
        this.activeIndex = 0;
        return;
      }
      const index = this.list.findIndex(item => !item.disabled);
      if (index === -1 ) {
        this.activeIndex = 0;
        return;
      }
      this.activeIndex = index;
    },
    propUpdate() {
      this.$nextTick(() => {
        this.setIndicatorPosition(this.activeIndex);
      });
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
