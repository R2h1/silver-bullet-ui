<template>
  <SbText :style="styles">
    <template v-for="({ chunk, highlighted }, index) in highlightChunks">
      <Mark 
        v-if="highlighted"
        :color="color"
        :bgColor="bgColor"
        :style="highlightStyles"
        :key="index">{{chunk}}</Mark>
      <span :key="index" v-else>{{chunk}}</span>
    </template>
  </SbText>
</template>

<script>
import props from './props.js';
import highlighter from './highlight.js';
import SbText from '../text/text.vue';
import Mark from '../mark/mark.vue';

export default {
  name: 'sb-highlight',
  components: {
    SbText,
    Mark,
  },
  props: { 
    ...props
  },
  data() {
    return {
      prefixClass: 'sb-highlight',
    }
  },
  computed: {
    styles() {
      const style = {
        
      }
      return style
    },
    highlightChunks() {
      if (!this.$slots.default || this.$slots.default.some(item => item.tag)) {
        throw new Error('只能支持字符串')
      }
      return highlighter(this.$slots.default[0].text, this.highlight);
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
