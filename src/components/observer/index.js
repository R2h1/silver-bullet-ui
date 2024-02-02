import Observer from "./observer.vue";

Notification.install = () => {
    Vue.component(Observer.name, Observer);
};

export const YtObserver = Observer;

export default Observer;

export * from ".";