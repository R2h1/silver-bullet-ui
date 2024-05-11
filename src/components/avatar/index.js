import Avatar from "./avatar.vue";

Avatar.install = (Vue) => {
    Vue.component(Avatar.name, Avatar);
};

export const YtAvatar = Avatar;

export default Avatar;

export * from ".";