import Overlay from "./overlay.vue";

Overlay.install = (Vue) => {
    Vue.component(Overlay.name, Overlay);
};

export const YtOverlay = Overlay;

export default Overlay;

export * from ".";