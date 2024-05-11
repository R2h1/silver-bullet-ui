import BackgroundImage from "./background-image.vue";

BackgroundImage.install = (Vue) => {
    Vue.component(BackgroundImage.name, BackgroundImage);
};

export const YtBackgroundImage = BackgroundImage;

export default BackgroundImage;

export * from ".";