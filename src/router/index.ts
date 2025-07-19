import Vue from "vue";
import VueRouter from "vue-router";

import Filter from "../components/filter/index.vue";
import ThemeList from "../components/theme-list/index.vue";
import Selector from "../components/selector/index.vue";
import DatePicker from "../components/date-picker/index.vue";
import Notification from "../components/notification/index.vue";
import Upload from "../components/upload/index.vue";
import Flex from "../components/flex/index.vue";
import Message from "../components/message/index.vue";
import SegmentedControl from "../components/segmented-control/index.vue";
import Center from "../components/center/index.vue";
import Container from "../components/container/index.vue";
import Divider from "../components/divider/index.vue";
import Loader from "../components/loader/index.vue";
import Overlay from "../components/overlay/index.vue";
import LoadingOverlay from "../components/loading-overlay/index.vue";
import Timeline from "../components/timeline/index.vue";
import AmountSelect from "../components/amount-select/amount-select.vue";
import ThemeIcon from "../components/theme-icon/index.vue";
import NumberFormatter from "../components/number-formatter/index.vue";
import Text from "../components/text/index.vue";
import Progress from "../components/progress/index.vue";
import Spoiler from "../components/spoiler/index.vue";
import Mark from "../components/mark/index.vue";
import Highlight from "../components/highlight/index.vue";
import Blockquote from "../components/blockquote/index.vue";
import Code from "../components/code/index.vue";
import List from "../components/list/index.vue";
import Table from "../components/table/index.vue";
import Title from "../components/title/index.vue";
import Accordion from "../components/accordion/index.vue";
import Avatar from "../components/avatar/index.vue";
import BackgroundImage from "../components/background-image/index.vue";
import Badge from "../components/badge/index.vue";
import Cascader from "@/components/cascader/index.vue";
import AnimateNumber from "@/components/animate-number/index.vue";
import MultiHeaderTable from "@/components/multi-header-table/index.vue";

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
      path: "/notification",
      name: "notification",
      component: Notification,
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload,
    },
    {
      path: "/flex",
      name: "flex",
      component: Flex,
    },
    {
      path: "/message",
      name: "message",
      component: Message,
    },
    {
      path: "/sc",
      name: "sc",
      component: SegmentedControl,
    },
    {
      path: "/center",
      name: "center",
      component: Center,
    },
    {
      path: "/container",
      name: "container",
      component: Container,
    },
    {
      path: "/divider",
      name: "divider",
      component: Divider,
    },
    {
      path: "/loader",
      name: "loader",
      component: Loader,
    },
    {
      path: "/overlay",
      name: "overlay",
      component: Overlay,
    },
    {
      path: "/loading-overlay",
      name: "loading-overlay",
      component: LoadingOverlay,
    },
    {
      path: "/timeline",
      name: "timeline",
      component: Timeline,
    },
    {
      path: "/amount-select",
      name: "amount-select",
      component: AmountSelect,
    },
    {
      path: "/theme-icon",
      name: "theme-icon",
      component: ThemeIcon,
    },
    {
      path: "/number-formatter",
      name: "number-formatter",
      component: NumberFormatter,
    },
    {
      path: "/text",
      name: "text",
      component: Text,
    },
    {
      path: "/progress",
      name: "progress",
      component: Progress,
    },
    {
      name: "spoiler",
      path: "/spoiler",
      component: Spoiler,
    },
    {
      name: "mark",
      path: "/mark",
      component: Mark,
    },
    {
      name: "highlight",
      path: "/highlight",
      component: Highlight,
    },
    {
      name: "blockquote",
      path: "/blockquote",
      component: Blockquote,
    },
    {
      name: "code",
      path: "/code",
      component: Code,
    },
    {
      name: "list",
      path: "/list",
      component: List,
    },
    {
      name: "table",
      path: "/table",
      component: Table,
    },
    {
      name: "title",
      path: "/title",
      component: Title,
    },
    {
      name: "accordion",
      path: "/accordion",
      component: Accordion,
    },
    {
      name: "avatar",
      path: "/avatar",
      component: Avatar,
    },
    {
      name: "background-image",
      path: "/background-image",
      component: BackgroundImage,
    },
    {
      name: "badge",
      path: "/badge",
      component: Badge,
    },
    {
      name: "cascader",
      path: "/cascader",
      component: Cascader,
    },
    {
      name: "animate-number",
      path: "/animate-number",
      component: AnimateNumber,
    },
    {
      name: "multi-header-table",
      path: "/multi-header-table",
      component: MultiHeaderTable,
    },
  ],
});

export default router;
