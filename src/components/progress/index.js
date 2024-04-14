import Progress from "./progress.vue";

Progress.install = (Vue) => {
    Vue.component(Progress.name, Progress);
};

export const YtProgress = Progress;

export default Progress;

export * from ".";