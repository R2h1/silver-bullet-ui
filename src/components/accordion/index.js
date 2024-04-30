import Accordion from "./accordion.vue";

Accordion.install = (Vue) => {
    Vue.component(Accordion.name, Accordion);
};

export const YtAccordion = Accordion;

export default Accordion;

export * from ".";