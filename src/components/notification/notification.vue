<template>
  <div :class="`${prefixClass}`" :style="styles" @mouseenter="clearTimer" @mouseleave="setTimer">
    <div v-if="showIcon" :class="`${prefixClass}__icon`" >
      <slot name="icon">
          <svg v-if="type==='info'" fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="icon is-info">
            <path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM11 8.5v-2h2v2h-2zm2 1.5v7.5h-2V10h2z">
            </path>
          </svg>
          <svg v-else-if="type==='success'" fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="icon is-success">
            <path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM7.5 10.59l3 3 6-6L17.91 9l-7.41 7.41L6.09 12l1.41-1.41z">
            </path>
          </svg>
          <svg v-else-if="type==='warning'" fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="icon is-warning">
            <path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM11 8.5v-2h2v2h-2zm2 1.5v7.5h-2V10h2z">
            </path>
          </svg>
          <svg v-else-if="type==='error'" fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="icon is-error">
            <path fill="currentColor" d="M12 23a11 11 0 100-22 11 11 0 000 22zM11 8.5v-2h2v2h-2zm2 1.5v7.5h-2V10h2z">
            </path>
          </svg>
      </slot>
    </div>
    <div :class="`${prefixClass}__main`">
      <div :class="`${prefixClass}__title-wrap`">
          <span :class="`${prefixClass}__title`">
            {{ title }}
          </span>
          <span v-if="closeable" :class="`${prefixClass}__close`" @click="close">
            <slot name="closeIcon">
              <svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="icon icon-close">
                <path fill="currentColor" d="M7.05 5.64L12 10.59l4.95-4.95 1.41 1.41L13.41 12l4.95 4.95-1.41 1.41L12 13.41l-4.95 4.95-1.41-1.41L10.59 12 5.64 7.05l1.41-1.41z"></path>
              </svg>
            </slot>
          </span>
      </div>
      <div v-if="content || $slots.cont" :class="`${prefixClass}__content`">
        <slot name="cont">
          {{ content }}
        </slot>
      </div>
      <div v-if="$slots.foot" :class="`${prefixClass}__footer`">
        <slot name="foot">
        </slot>
      </div>  
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import props from './props';

export default Vue.extend({
  name: 'yt-notification',
  props: { ...props },
  data() {
    return {
      prefixClass: 'yt-notification',
      timer: null,
    }
  },
  created() {
    this.duration && this.setTimer();
  },
  unmounted() {
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
        this.$emit('duration-end');
        if (this.onDurationEnd) {
          this.onDurationEnd();
        }
      }, this.duration)
    },
    close(event) {
      this.$emit('close-btn-click', { event });
      if (this.onCloseBtnClick) {
        this.onCloseBtnClick({ event });
      }
    },
  }
});
</script>

<style>
</style>