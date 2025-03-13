<template>
  <span>{{ formattedNumber }}</span>
</template>

<script>
const easingPresets = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  bounceOut: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    else return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};
export default {
  name: "sb-animate-number",
  props: {
    value: { type: Number, default: 0 },
    start: Number,
    end: Number,
    duration: { type: Number, default: 1000 },
    decimals: {
      type: Number,
      default: 0,
      validator: (v) => v >= 0,
    },
    easing: {
      type: [String, Function],
      default: "easeOut",
      validator(v) {
        return (
          typeof v === "function" || Object.keys(easingPresets).includes(v)
        );
      },
    },
  },
  data() {
    return {
      displayNumber: this.start ?? 0,
      animationFrame: null,
      startTimestamp: null,
      startValue: this.start ?? 0,
    };
  },
  computed: {
    targetValue() {
      return this.end ?? this.value;
    },
    easingFunc() {
      return typeof this.easing === "function"
        ? this.easing
        : easingPresets[this.easing];
    },
    formattedNumber() {
      const precision = 10 ** this.decimals;
      const num = Math.round(this.displayNumber * precision) / precision;
      return num.toLocaleString(undefined, {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals,
      });
    },
  },
  watch: {
    value: "startAnimation",
    end: "startAnimation",
    start(val) {
      this.startValue = val ?? 0;
      this.startAnimation();
    },
    easingFunc: "startAnimation",
  },
  mounted() {
    this.startAnimation();
  },
  beforeDestroy() {
    this.animationFrame && cancelAnimationFrame(this.animationFrame);
  },
  methods: {
    animate(timestamp) {
      if (!this.startTimestamp) this.startTimestamp = timestamp;
      const elapsed = timestamp - this.startTimestamp;
      const progress = Math.min(elapsed / this.duration, 1);
      const eased = this.easingFunc(progress);

      this.displayNumber =
        this.startValue + (this.targetValue - this.startValue) * eased;

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(this.animate);
      }
    },
    startAnimation() {
      this.animationFrame && cancelAnimationFrame(this.animationFrame);
      this.startValue = this.displayNumber;
      this.startTimestamp = null;
      this.animationFrame = requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
