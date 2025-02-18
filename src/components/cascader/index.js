import Cascader from "./cascader.vue";
Cascader.install = (Vue) => {
  Vue.component(Cascader.name, Cascader);
};

export const SbCascader = Cascader;

export default Cascader;

export * from ".";
