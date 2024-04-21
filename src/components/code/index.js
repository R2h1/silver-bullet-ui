import Code from "./blockquote.vue";

Code.install = (Vue) => {
    Vue.component(Code.name, Code);
};

export const YtCode = Code;

export default Code;

export * from ".";