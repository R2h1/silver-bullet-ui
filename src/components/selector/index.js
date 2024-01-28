import Selector from './selector.vue';

Selector.install = function(Vue) {
  Vue.component(Selector.name, Selector);
}

export const YtSelector = Selector;

export default Selector;

export * from '.';