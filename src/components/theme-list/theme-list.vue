<template>
  <transition-group
      name="drag"
      tag="ul"
      ref="theme-list" 
      :class="`${prefixClass}`"
      @dragover.native="handle($event)"
      @dragenter.native="handle($event)"
    >
    <li
      :draggable="draggable"
      :class="[{ active: activeList[index], 'draggable': draggable }, `${prefixClass}__item`]" 
      @click="handleClick(item, index)" 
      v-for="(item, index) in data" :key='item[valueField]'
      @drop="handleDrop($event, index)"
      @dragstart="handleDragStart($event, index)"
      @dragover="handleDragover($event)"
      >
        <slot :current="item" :index="index">
          <slot v-if="draggable" name='reference'>
            <span >
              <i class="el-icon-rank"></i>
            </span>
          </slot>
          {{ item.label }}
        </slot>
      </li>
  </transition-group>
</template>

<script>
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
  },
  data() {
    return {
      prefixClass: 'sb-theme-list',
      loading: false,
      draggingIndex: -1,
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
    handleDragStart(event, index) {
      event.dataTransfer.effectAllowed = 'move';
      this.draggingIndex = index;
    },
    handleDragover(event) {
      event.preventDefault();
    },
    handleDrop(event, index){
      event.preventDefault();
      // 排除自身
      if (this.draggingIndex === index) return;
      // 拖拽的元素
      const draggingItem = this.data[this.draggingIndex];
      this.data.splice(this.draggingIndex, 1);
      this.data.splice(index, 0, draggingItem);
      // 更新为拖拽进入的 index
      this.draggingIndex = index;
    },
    handle(event) {
      console.log(11111)
      event.preventDefault();
    }
  }
};

</script>

<style lang="scss">
@import './index.scss';
</style>


