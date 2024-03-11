import Container from "./container.vue";

Container.install = () => {
    Vue.component(Container.name, Container);
};

export const YtContainer = Container;

export default Container;

export * from ".";