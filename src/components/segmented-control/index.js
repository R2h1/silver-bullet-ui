import SegmentedControl from "./segmented-control.vue";

SegmentedControl.install = (Vue) => {
    Vue.component(SegmentedControl.name, SegmentedControl);
};

export const YtSegmentedControl = SegmentedControl;

export default SegmentedControl;

export * from ".";