import Notification from "./notification.vue";
import Notify from './plugin'
import Vue from 'vue';

Notification.install = (Vue) => {
    Vue.component(Notification.name, Notification);
};

Vue.use(Notify);

export const YtNotification = Notification;

export { Notify }

export default Notification;

export * from ".";