<template>
  <div :class="`${prefixClass}`" :style="styles" :data-active="active">
    <button
      :class="`${prefixClass}__control`"
      :data-accordion-control="true"
      @click="handleClick(data)"
    >
      <span :class="`${prefixClass}__control--chevron`" :data-rotate="active">
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 16px; height: 16px; display: block"
        >
          <path
            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
      <span :class="`${prefixClass}__control--label`">{{ data.value }}</span>
      <span :class="`${prefixClass}__control--icon`">{{ data.emoji }}</span>
    </button>
    <div ref="panel" :class="`${prefixClass}__panel`">
      <div :class="`${prefixClass}__panel--content`">
        {{ data.description }}
      </div>
    </div>
    <img
      src="/assets/newzhidao-da1cf444b0.png"
    />
  </div>
</template>

<script>
export default {
  name: "sb-accordion-item",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prefixClass: "sb-accordion-item",
    };
  },
  computed: {
    styles() {
      const style = {};
      return style;
    },
  },
  mounted() {
    const panel = this.$refs.panel;
    if (!this.active) {
      panel.style.height = "0px";
      panel.style.opacity = 0;
    }
  },
  watch: {
    active(newVal) {
      const panel = this.$refs.panel;
      if (newVal) {
        panel.style.height = "auto";
        const height = panel.clientHeight;
        panel.style.height = "0px";
        window.requestAnimationFrame(() => {
          panel.style.opacity = 1;
          panel.style.height = `${height}px`;
        });
      } else {
        panel.style.height = `${panel.clientHeight}px`;
        window.requestAnimationFrame(() => {
          panel.style.height = "0px";
          panel.style.opacity = 0;
        });
      }
    },
  },
  methods: {
    handleClick(data) {
      if (this.active) {
        this.$emit("hide");
      } else {
        this.$emit("show", data.value);
      }
    },
  },
};
</script>
