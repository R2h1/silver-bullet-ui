import Text from "./text.vue";

Text.install = () => {
    Vue.component(Text.name, Text);
};

export const YtText = Text;

export default Text;

export * from ".";