import Blockquote from "./blockquote.vue";

Blockquote.install = (Vue) => {
    Vue.component(Blockquote.name, Blockquote);
};

export const YtBlockquote = Blockquote;

export default Blockquote;

export * from ".";