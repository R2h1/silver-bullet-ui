<template>
  <ul ref="theme-list" :class="`${prefixClass}`">
    <li
      
      :class="[{ active: activeList[index] }, `${prefixClass}__item`]" 
      @click="handleClick(item, index)" 
      v-for="(item, index) in data" :key='item[valueField]' >
        <slot :current="item" :index="index">
          {{ item.label }} <Observer v-if="index === data.length - 1" @intersect="handleIntersect"/>
        </slot>
      </li>
  </ul>
</template>

<script>
import Observer from '../observer/observer.vue';
import props from './props';

const COLOR_INFO_KEYS = [
  'defaultColor', 
  'defaultBgColor', 
  'hoverColor', 
  'hoverBgColor', 
  'activeColor', 
  'activeBgColor'
]

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...props
  },
  components: {
    Observer
  },
  data() {
    return {
      prefixClass: 'sb-theme-list',
      loading: false,
    }
  },
  computed: {
    activeList() {
      return this.data.map((item) => {
        return item[this.valueField] === this.value[this.valueField] ? true : false;
      });
    },
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    handleClick(value, index) {
      if (this.once && value[this.valueField] === this.value[this.valueField]) return;
      this.$emit('change', value, index);
    },
    kebabCase(str) {
      return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
    },
    setTheme() {
      for (let key of COLOR_INFO_KEYS) {
        if (this.hasOwn(this.colorInfo, key)) {
          this.$refs['theme-list'].style.setProperty(`--sb-${this.kebabCase(key)}`, this.colorInfo[key]);
        }
      }
    },
    hasOwn(obj, key) {
      if (Object.hasOwn) {
        return Object.hasOwn(obj, key);
      }
      return obj.hasOwnProperty(key);
    },
    handleIntersect() {
      console.log('科技')
    }
  }
};

</script>

<style lang="scss">
@import './index.scss';
</style>