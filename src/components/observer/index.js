import Observer from "./observer.vue";

Observer.install = (Vue) => {
    Vue.component(Observer.name, Observer);
};

export const YtObserver = Observer;

export default Observer;

export * from ".";