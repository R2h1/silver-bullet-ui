<template>
  <div v-if="create" :class="`${prefixClass}`" @mouseenter="show = true" @mouseleave="show = false">
    <slot></slot>
    <clear-icon v-show="show" @click.native="handleClick" :class="`${prefixClass}__icon`" />
  </div>
</template>

<script>
import { ClearIcon } from '../icons';

export default {
  name: 'sb-remove',
  components: {
    ClearIcon
  },
  data() {
    return {
      prefixClass: 'sb-remove',
      show: false,
      create: true,
    }
  },
  methods: {
    handleClick() {
      this.create = false;
      this.$emit('remove');
    },
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
