<template>
  <SbText>
    Highlight <Mark >this chunk</Mark> of the text
  </SbText>
</template>

<script>
import Mark from "./mark.vue";
import SbText from '../text/index.js';

export default {
  components: {
    Mark,
    SbText
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped>
</style>
