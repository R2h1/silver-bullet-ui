import Spoiler from "./progress.vue";

Spoiler.install = (Vue) => {
    Vue.component(Spoiler.name, Spoiler);
};

export const YtSpoiler = Spoiler;

export default Spoiler;

export * from ".";