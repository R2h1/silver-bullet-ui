<template>
  <div :class="`${prefixClass}`" @mouseenter="clearTimer" @mouseleave="setTimer">
    <tips-icon :class="[`${prefixClass}__icon`, {
      'is-info': type === 'info',
      'is-warning': type === 'warning',
      'is-error': type === 'error',
    }]" v-if="['info', 'warning', 'error'].includes(type)"/>
    <success-icon :class="[`${prefixClass}__icon`, 'is-success']" v-else-if="type === 'success'"/>
    {{message}}
    <close-normal-icon @click.native="close($event)" :class="`${prefixClass}--close-icon`" v-if="closable" />
  </div>
</template>

<script>
import props from './props';
import {
  SuccessIcon,
  TipsIcon,
  CloseNormalIcon
} from '../icons'

export default {
  name: 'sb-message',
  components: {
    SuccessIcon,
    TipsIcon,
    CloseNormalIcon
  },
  props: { ...props },
  data() {
    return {
      prefixClass: 'sb-message',
      timer: null,
    }
  },
  mounted() {
    console.log('this.', this.duration)
    this.setTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
  methods: {
    clearTimer() {
      this.duration && window.clearTimeout(this.timer);
    },
    setTimer() {
      if (!this.duration) return;
      this.timer = window.setTimeout(() => {
        this.clearTimer();
        this.$emit('close');
        this.onClose && this.onClose();
      }, this.duration);
    },
    close(event) {
      this.$emit('close');
      this.onClose && this.onClose({ event });
    }
  }
}
</script>