import NumberFormatter from "./number-formatter.vue";

NumberFormatter.install = (Vue) => {
    Vue.component(NumberFormatter.name, NumberFormatter);
};

export const YtNumberFormatter = NumberFormatter;

export default NumberFormatter;

export * from ".";