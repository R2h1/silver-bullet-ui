<template>
  <li :class="`${prefixClass}`" :style="styles" >
    <slot name="control"></slot>
    <slot name="panel"></slot>
  </li>
</template>

<script>

export default {
  name: 'sb-accordion-item',
  data() {
    return {
      prefixClass: 'sb-accordion-item',
    }
  },
  computed: {
    styles() {
      const style = {
      }
      return style;
    },
    center() {
      return this.$parent.$props.center;
    }
  },
}
</script>