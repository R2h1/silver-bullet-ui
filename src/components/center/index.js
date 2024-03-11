import Center from "./center.vue";

Center.install = () => {
    Vue.component(Center.name, Center);
};

export const YtCenter = Center;

export default Center;

export * from ".";