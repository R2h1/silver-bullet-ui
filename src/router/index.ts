import Vue from "vue";
import VueRouter from "vue-router";
import Filter from "../components/filter/index.vue";
import ThemeList from "../components/theme-list/index.vue";
import Selector from "../components/selector/index.vue";
import DatePicker from "../components/date-picker/date-picker.vue";
import Notification from "../components/notification/index.vue";
import Upload from "../components/upload/index.vue";
import Flex from "../components/flex/index.vue";
import Message from "../components/message/test.vue";
import SegmentedControl from "../components/segmented-control/index.vue";
import Center from '../components/center/index.vue'
import Container from '../components/container/index.vue'
import Divider from '../components/divider/index.vue'
import Loader from '../components/loader/index.vue'
import Overlay from '../components/overlay/index.vue'
import LoadingOverlay from '../components/loading-overlay/index.vue'
import Timeline from '../components/timeline/index.vue';
import AmountSelect from '../components/amount-select/amount-select.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: ThemeList,
    },
    {
      path: "/filter",
      name: "filter",
      component: Filter,
    },
    {
      path: "/selector",
      name: "selector",
      component: Selector,
    },
    {
      path: "/date-picker",
      name: "date-picker",
      component: DatePicker,
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/flex',
      name: 'flex',
      component: Flex,
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
    },
    {
      path: '/sc',
      name: 'sc',
      component: SegmentedControl,
    },
    {
      path: '/center',
      name: 'center',
      component: Center,
    },
    {
      path: '/container',
      name: 'container',
      component: Container,
    },
    {
      path: '/divider',
      name: 'divider',
      component: Divider,
    },
    {
      path: '/loader',
      name: 'loader',
      component: Loader,
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: Overlay,
    },
    {
      path: '/loading-overlay',
      name: 'loading-overlay',
      component: LoadingOverlay,
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline,
    },
    {
      path: '/amount-select',
      name: 'amount-select',
      component: AmountSelect,
    },
    
  ],
});

export default router;
