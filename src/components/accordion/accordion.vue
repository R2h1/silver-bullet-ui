<template>
  <div :class="`${prefixClass}`" :style="styles" >
    <AccordionItem 
      v-for="item in data" 
      :key="item.value"
      :value="item.value"
      :active="item.value === value"
      :data="item"
      @show="handleShow"
      @hide="handleHide"></AccordionItem>
  </div>
</template>

<script>
import props from './props.js';
import AccordionItem from './accordion-item.vue';
import { RADIUS_MAP } from '../../core';

export default {
  name: 'sb-accordion',
  components: {
    AccordionItem
  },
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-accordion',
    }
  },
  computed: {
    styles() {
      const style = {
        '--accordion-radius': `${RADIUS_MAP[this.radius] || this.radius}px`,
      }
      return style;
    },
  },
  methods: {
    handleShow(value) {
      this.$emit('input', value);
    },
    handleHide() {
      this.$emit('input');
    }
  },
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
