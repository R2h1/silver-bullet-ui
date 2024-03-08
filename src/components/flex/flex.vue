<template>
  <div :class="[
    `${prefixClass}`,
    {
      'align-center': align === 'center',
      'align-end': align === 'end',
      'align-start': align === 'start',
      'align-baseline': align === 'baseline',
      vertical,
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
      'justify-between': justify === 'between',
      wrap,
    }
  ]" :style="{ gap,  'min-height': `${mih}px` }">
    <slot></slot>
  </div>
</template>

<script>
import props from './props';

const componentName = 'yt-flex';

export default {
  name: componentName,
  props: {
    ...props,
  },
  data() {
    return {
      prefixClass: componentName,
    }
  },
  computed: {
    gap() {
      if (Array.isArray(this.space)) {
        return `${this.space.join('px ')}px`;
      }
      return `${this.space}px`;
    }
  }
}
</script>

<style lang="scss">
@import "../common/bem.scss";

@include block(flex) {
  display: flex;
  
  &.align-start {
    align-items: flex-start;
  }
  &.align-center {
    align-items: center;
  }
  &.align-end {
    align-items: flex-end;
  }
  &.align-baseline {
    align-items: baseline;
  }
  &.vertical {
    flex-direction: column;
  }
  &.justify-center {
    justify-content: center;
  }

  &.justify-between {
    justify-content: space-between;
  }

  &.justify-end {
    justify-content: flex-end;
  }
  &.wrap {
    flex-wrap: wrap;
  }
}
</style>