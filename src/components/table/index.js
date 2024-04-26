import Table from "./table.vue";

Table.install = (Vue) => {
    Vue.component(Table.name, Table);
};

export const YtTable = Table;

export default Table;

export * from ".";