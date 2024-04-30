import Title from "./title.vue";

Title.install = (Vue) => {
    Vue.component(Title.name, Title);
};

export const YtTitle = Title;

export default Title;

export * from ".";