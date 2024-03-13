import LoadingOverlay from "./loading-overlay.vue";

LoadingOverlay.install = () => {
    Vue.component(LoadingOverlay.name, LoadingOverlay);
};

export const YtLoadingOverlay = LoadingOverlay;

export default LoadingOverlay;

export * from ".";