<template>

  <transition-group
      name="drag"
      tag="ul"
      ref="theme-list" 
      :class="`${prefixClass}`"
      @dragover.native="handlePreventDefault($event)"
      @dragenter.native="handlePreventDefault($event)"
    >
    <li
      :draggable="canDraggable && !item.disabled"
      :class="[{ 
        active: activeList[index], 
        'draggable': canDraggable, 
        'is-disabled': item.disabled  }, `${prefixClass}__item`]" 
      v-for="(item, index) in data" 
      :key='item[valueField]'
      @click="handleClick(item, index)" 
      @drop="handleDrop($event, item, index)"
      @dragstart="handleDragStart($event, item, index)"
      @dragover="handleDragover($event, item)"
      >
        <slot :current="item" :index="index">
          <span >
            <i v-if="canDraggable && !item.disabled" class="el-icon-rank"></i>
            {{ item.label }}
          </span>
          <el-switch 
            v-if="multiple && !item.disabled"
            :width="32"
            :value="activeList[index]">
          </el-switch>
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
      draggingIndex: -1,
    }
  },
  computed: {
    activeList() {
      if (this.multiple) {
        const selectedValues = this.value.map(item => item[this.valueField]);
        const res = this.data.map((item) => {
          return selectedValues.includes(item[this.valueField]) ? true : false;
        });
        return res;
      }
      const res = this.data.map((item) => {
        return item[this.valueField] === this.value[this.valueField] ? true : false;
      });
      return res;
    },
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    handleClick(value, index) {
      if (this.multiple) { 
        const isSelected = this.activeList[index];
        if (isSelected) {
          this.value.splice(this.value.findIndex((item) => item === value), 1)
        } else {
          this.value.push(value);
        }
        this.$emit('change', this.value);
        return;
      }
      if (this.once && value[this.valueField] === this.value[this.valueField]) return;
      this.$emit('change', value, index);
    },
    kebabCase(str) {
      return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
    },
    setTheme() {
      for (let key of COLOR_INFO_KEYS) {
        if (this.hasOwn(this.colorInfo, key)) {
          this.$refs['theme-list'].$el.style.setProperty(`--sb-${this.kebabCase(key)}`, this.colorInfo[key]);
        }
      }
    },
    hasOwn(obj, key) {
      if (Object.hasOwn) {
        return Object.hasOwn(obj, key);
      }
      return obj.hasOwnProperty(key);
    },
    handleDragStart(event, item, index) {
      if (!this.canDraggable || item.disabled) {
        return true;
      }
      event.dataTransfer.effectAllowed = 'move';
      this.draggingIndex = index;
    },
    handleDragover(event, item) {
      if (!this.canDraggable || item.disabled) {
        return true;
      }
      event.preventDefault();
    },
    handleDrop(event, item, index){
      if (!this.canDraggable || item.disabled) {
        return true;
      }
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
    handlePreventDefault(event) {
      if (!this.canDraggable) {
        return;
      }
      event.preventDefault();
    },
  }
};

</script>

<style lang="scss">
@import './index.scss';
</style>


