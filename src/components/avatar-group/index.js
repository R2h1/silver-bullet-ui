import AvatarGroup from "./avatar-group.vue";
AvatarGroup.install = (Vue) => {
    Vue.component(AvatarGroup.name, AvatarGroup);
};

export const YtAvatarGroup = AvatarGroup;

export default AvatarGroup;

export * from ".";