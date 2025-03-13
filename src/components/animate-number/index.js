import AnimateNumber from "./animate-number.vue";
AnimateNumber.install = (Vue) => {
  Vue.component(AnimateNumber.name, AnimateNumber);
};

export const SbAnimateNumber = AnimateNumber;

export default AnimateNumber;

export * from ".";
