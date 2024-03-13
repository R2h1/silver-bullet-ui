import Loader from "./loader.vue";

Loader.install = () => {
    Vue.component(Loader.name, Loader);
};

export const YtLoader = Loader;

export default Loader;

export * from ".";