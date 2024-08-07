<template>
    <ul v-if="!canDraggable" ref="theme-list" :class="`${prefixClass}`">
        <li
            :class="[{ 
                active: activeList[index], 
                'is-disabled': item.disabled 
            }, `${prefixClass}__item`]"
            @click="handleClick(item, index)"
            v-for="(item, index) in data"
            :key="item[valueField]"
        >
            <slot name="default" :current="item" :index="index">
                {{ item.label }}
            </slot>
        </li>
    </ul>
    <transition-group
        v-else
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
                active: showActiveStyle && activeList[index], 
                'draggable': canDraggable, 
                'is-disabled': item.disabled  }, `${prefixClass}__item`]" 
            v-for="(item, index) in data" 
            :key="item[valueField]"
            @click="handleClick(item, index)" 
            @drop="handleDrop($event, item, index)"
            @dragstart="handleDragStart($event, item, index)"
            @dragover="handleDragover($event, item)"
            >
                <span :class="`${prefixClass}__item--can-drag`">
                    <move-icon class="move-icon" v-if="canDraggable && !item.disabled"/>
                    {{ item.label }}
                </span>
                <el-switch v-if="multiple" :disabled="item.canSwitch === false"
                    :value="activeList[index]">
                </el-switch>
        </li>
    </transition-group>
</template>
<script>
import { Switch as ElSwitch } from 'element-ui';
import { MoveIcon } from '../icons'

const DEFAULT_COLOR_INFO = { 
    color: 'rgba(0, 0, 0, 0.9)', 
    bgColor: 'rgb(255, 255, 255)', 
    hoverColor: 'rgba(0, 0, 0, 0.9)', 
    hoverBgColor: '#F3F3F3', 
    activeColor: '#1974FF', 
    activeBgColor: '#E8F5FF', 
}

export default {
    name: 'sb-theme-list',
    components: {
        MoveIcon,
        ElSwitch
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        value: {
            type: [Object, Array],
            default: () => ({}),
        },
        colorInfo: {
            type: Object,
            default: () => ({})
        },
        valueField: {
            type: String,
            default: 'value'
        },
        once: { // active 是否只触发一次
            type: Boolean,
            default: true,
        },
        canDraggable: {
            type: Boolean,
            default: false,
        },
        multiple: { // 可多选
            type: Boolean,
            default: false,
        },
        showActiveStyle: {
            type: Boolean,
            default: true
        }
    },
    data() { 
        return { 
            prefixClass: 'sb-theme-list',
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
        } 
    },
    mounted() { 
        this.setTheme(); 
    },
    methods: {
        handleClick(value, index) {
            if (value.canSwitch === false) {
                return;
            }
            if (this.multiple) { 
                const isSelected = this.activeList[index];
                if (isSelected) {
                    this.value.splice(this.value.findIndex((item) => item === value), 1)
                } else {
                    this.value.push(value);
                }
                this.$emit('change', this.value, value);
                return;
            }
            this.$emit('click-item', value, index);
            if (this.once && value[this.valueField] === this.value[this.valueField]) return;
            this.$emit('change', value, this.value, index);
        },
        kebabCase(str) { 
            return str.replace(/\B([A-Z])/g, '-$1').toLowerCase(); 
        },
        setTheme() {
            let el = this.$refs['theme-list'];
            if (this.canDraggable) {
                el = this.$refs['theme-list'].$el;
            }
            Object.entries(DEFAULT_COLOR_INFO).forEach(([key, value]) => {
                el.style.setProperty( `--${this.kebabCase(key)}`, 
                this.hasOwn(this.colorInfo, key) &&  this.colorInfo[key]
                    ? this.colorInfo[key] 
                    : value); 
            }); 
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
            const dropItem = this.data[index];
            this.data.splice(this.draggingIndex, 1);
            this.data.splice(index, 0, draggingItem);
            // 更新为拖拽进入的 index
            this.draggingIndex = index;
            // 更新排序标识
            [draggingItem.sort, dropItem.sort] = [dropItem.sort, draggingItem.sort]
            this.$emit('drag-end', this.data);
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
@import './theme-list.scss';
</style>
