import List from "./list.vue";

List.install = (Vue) => {
    Vue.component(List.name, List);
};

export const YtList = List;

export default List;

export * from ".";