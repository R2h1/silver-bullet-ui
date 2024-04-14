import Timeline from "./timeline.vue";

Timeline.install = (Vue) => {
    Vue.component(Timeline.name, Timeline);
};

export const YtTimeline = Timeline;

export default Timeline;

export * from ".";