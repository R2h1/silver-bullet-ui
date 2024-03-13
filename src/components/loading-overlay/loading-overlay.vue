<template>
  <div :class="`${prefixClass}`">

  </div>
</template>

<script>
import props from './props.js';

export default {
  name: 'yt-loading-overlay',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'yt-loading-overlay',
    }
  },
  computed: {
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
