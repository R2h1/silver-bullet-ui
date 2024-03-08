<template>
  <div :class="`${prefixClass}`" @mouseenter="clearTimer" @mouseleave="setTimer">
    <info-icon :class="`${prefixClass}__info-icon`" v-if="type === 'info'"/>
    <success-icon :class="`${prefixClass}__success-icon`" v-else-if="type === 'success'"/>
    <warning-icon :class="`${prefixClass}__warning-icon`" v-else-if="type === 'warning'"/>
    <error-icon :class="`${prefixClass}__error-icon`" v-else-if="type === 'error'"/>
    {{message}}
    <close-normal-icon @click.native="close($event)" :class="`${prefixClass}--close-icon`" v-if="closable" />
  </div>
</template>

<script>
import props from './props';
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  CloseNormalIcon
} from '../icons'

export default {
  name: 'yt-message',
  components: {
    InfoIcon,
    SuccessIcon,
    WarningIcon,
    ErrorIcon,
    CloseNormalIcon
  },
  props: { ...props },
  data() {
    return {
      prefixClass: 'yt-message',
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