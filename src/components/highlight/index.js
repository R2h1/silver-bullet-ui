import Highlight from "./highlight.vue";

Highlight.install = (Vue) => {
    Vue.component(Highlight.name, Highlight);
};

export const YtHighlight = Highlight;

export default Highlight;

export * from ".";