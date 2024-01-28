import Filter from './filter.vue';

Filter.install = function(Vue) {
    Vue.component(Filter.name, Filter);
}

export const YtFilter = Filter;

export default Filter;

export * from '.';