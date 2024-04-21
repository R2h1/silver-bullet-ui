<template>
  <transition-group
    :class="`${prefixClass}`"
    tag="div"
    name="fade-message"
    :style="styles"
  >
    <Message 
      v-for="(item, index) in list" 
      :key="item.id"
      v-bind="item"
      @close="handleClose(index)"
      :on-close="item.onClose"
      />
  </transition-group>
</template>

<script>
import Message from './message.vue';

const DEFAULT_Z_INDEX = 7000;
const POSITION_OPTIONS = ['top', 'bottom'];
const DISTANCE = '32px';
const POSITION_OFFSET =  {
  top: {
    top: DISTANCE,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bottom: {
    bottom: DISTANCE,
    left: '50%',
    transform: 'translateX(-50%)',
  },
}

export default {
  name: 'sb-message-list',
  components: {
    Message
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator(val) {
        return POSITION_OPTIONS.includes(val);
      },
    },
    zIndex: {
      type: Number,
      default: DEFAULT_Z_INDEX,
    },
  },
  data() {
    return {
      prefixClass: 'sb-message-list',
      list: [],
    }
  },
  computed: {
    styles() {
      return {
        zIndex: this.zIndex,
        ...POSITION_OFFSET[this.position],
      }
    }
  },
  methods: {
    add(option) {
      this.list.push(option);
      return this.list.length - 1;
    },
    remove(index) {
      this.list.splice(index, 1)
    },
    removeAll() {
      this.list.splice(0);
    },
    handleClose(index) {
      this.remove(index);
    },
  }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>