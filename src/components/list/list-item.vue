<template>
  <li :class="`${prefixClass}`" :style="styles" :data-with-icon="Boolean($slots.icon)" :data-with-center="center">
    <div :class="`${prefixClass}__wrapper`">
      <span v-if="$slots.icon" :class="`${prefixClass}__icon`">
        <slot name="icon"></slot>
      </span>
      <span  v-if="$slots.default" :class="`${prefixClass}__label`">
        <slot></slot>
      </span>
    </div>
  </li>
</template>

<script>

export default {
  name: 'sb-list-item',
  data() {
    return {
      prefixClass: 'sb-list-item',
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