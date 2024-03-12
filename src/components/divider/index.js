import Divider from "./divider.vue";

Divider.install = () => {
    Vue.component(Divider.name, Divider);
};

export const YtMyDivider = Divider;

export default Divider;

export * from ".";