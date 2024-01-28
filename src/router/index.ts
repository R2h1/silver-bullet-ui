import Vue from "vue";
import VueRouter from "vue-router";
import Filter from "../components/filter/index.vue";
import ThemeList from "../components/theme-list/index.vue";

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
  ],
});

export default router;
