import ThemeIcon from "./theme-icon.vue";

ThemeIcon.install = (Vue) => {
    Vue.component(ThemeIcon.name, ThemeIcon);
};

export const YtThemeIcon = ThemeIcon;

export default ThemeIcon;

export * from ".";