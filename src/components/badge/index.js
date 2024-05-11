import Badge from "./badge.vue";
Badge.install = (Vue) => {
    Vue.component(Badge.name, Badge);
};

export const YtBadge = Badge;

export default Badge;

export * from ".";