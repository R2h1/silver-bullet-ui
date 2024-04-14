import Mark from "./mark.vue";

Mark.install = (Vue) => {
    Vue.component(Mark.name, Mark);
};

export const YtMark = Mark;

export default Mark;

export * from ".";