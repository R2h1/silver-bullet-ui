import Upload from "./upload.vue";

Upload.install = (Vue) => {
    Vue.component(Upload.name, Upload);
};

export const YtUploadBus = Upload;

export default Upload;

export * from ".";