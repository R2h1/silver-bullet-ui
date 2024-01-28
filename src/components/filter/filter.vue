<template>
    <div :class="`${prefixClass}`">
        <div :class="`${prefixClass}__header`">
            <el-popover
                placement="bottom"
                :visible-arrow="false"
                >
                <div :class="`${prefixClass}__title-wrap`" slot="reference">
                    <span :class="`${prefixClass}__title`">全部</span>
                    <span :class="`${prefixClass}__has-modify`">已修改</span>
                    <suffix-icon />
                </div>
                <div :class="`${prefixClass}__filter-list`">
                    <div v-for="filter in displayFilterList" :key="filter.id" > 
                        <span>
                            {{ filter.name }}
                        </span>
                        <span v-if="isDefaultFilter(filter)">默认</span>
                        <el-popover
                            placement="right"
                            :visible-arrow="false"
                        >
                            <more-icon :class="`${prefixClass}__more-icon`" slot="reference"/>
                            <div :class="`${prefixClass}__more-menu`">
                                <template v-for="moreMenuItem in filter.moreMenuConfig" >
                                    <span :key="moreMenuItem.value" v-if="moreMenuItem.show" >
                                        {{ moreMenuItem.value }}
                                    </span>
                                </template>
                            </div>
                        </el-popover>
                    </div>
                </div>
            </el-popover>
            <div :class="`${prefixClass}__filter-operate-list`">
                <button :class="`${prefixClass}__filter-operate-item`">保存为新视图</button>
                <button :class="`${prefixClass}__filter-operate-item`">保存变更</button>
                <button :class="`${prefixClass}__filter-operate-item`">重置</button>
            </div> 
            <div :class="`${prefixClass}__content-operate-list`">
                <el-popover
                    placement="bottom"
                    :visible-arrow="false"
                > 
                    <span :class="`${prefixClass}__content-operate-item`" slot="reference" >
                        {{ displaySortText }} 
                        <suffix-icon />
                    </span>
                    <div :class="`${prefixClass}__sort-list`">
                        <theme-list v-model="sortFieldConfig.value"  v-bind="sortFieldConfig" />
                    </div>
                </el-popover>
                <ascend-order-icon @click.native="sortFieldConfig.ascend = false"  v-if="sortFieldConfig.ascend"/>
                <descend-order-icon v-else @click.native="sortFieldConfig.ascend = true"/>
                <slot name="content-operate">
                </slot>
            </div>
        </div>
        <div :class="`${prefixClass}__condition-list`">
            <el-popover
                placement="bottom"
                :visible-arrow="false"
                >
                <button :class="`${prefixClass}__condition-config-trigger`" slot="reference" >筛选条件</button>
                <div :class="`${prefixClass}__condition-config`">
                    <div :class="`${prefixClass}__condition-config-header`"> 
                        <span :class="`${prefixClass}__condition-config-title`">筛选</span>
                        <close-normal-icon :class="`${prefixClass}__condition-config-close` "/>
                    </div>
                    <div :class="`${prefixClass}__condition-config-list`">
                        <div
                            :class="`${prefixClass}__condition-config-item`" 
                            v-for="condition in configConditionList"
                            :key="condition.key" > 
                                <Selector
                                    :class="`${prefixClass}__condition-config-item-front`"
                                    :key="`selector__${condition.fieldName}-front`" 
                                    v-bind="filterFieldConfig"
                                    @change="handleConditionChange(condition)"
                                    v-model="condition.fieldName"/>
                                <Selector 
                                    :class="`${prefixClass}__condition-config-item-back`" 
                                    :key="`selector__${condition.fieldName}-back`"  
                                    v-if="condition.componentType === 'selector'" 
                                    v-bind="condition"/>
                                <DatePicker 
                                    :class="`${prefixClass}__condition-config-item-back`" 
                                    :key="`date-picker__${condition.fieldName}-back`" 
                                    v-else-if="condition.componentType === 'date-picker'" 
                                    v-bind="condition"/>
                                <clear-icon />
                            </div>
                    </div>
                    <button :class="`${prefixClass}__condition-config-close`">添加筛选条件</button>
                </div>
            </el-popover>
            <template v-for="condition in curFilter.filterConditionList" >
                <Selector :key="`selector__${condition.fieldName}`"  v-if="condition.componentType === 'selector'" v-bind="condition"/>
                <DatePicker :key="`date-picker__${condition.fieldName}`" v-else-if="condition.componentType === 'date-picker'" v-bind="condition"/>
                <el-input 
                    v-else-if="condition.componentType === 'input'"
                    :placeholder="condition.placeholder" 
                    size="mini" 
                    style="width: 200px" 
                    :key="`input__${condition.label}`" 
                >
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </template>
        </div>
    </div>
</template>

<script>
import SuffixIcon from '../date-picker/icons/suffix-icon.vue';
import CloseNormalIcon from '../date-picker/icons/close-normal-icon.vue';
import ClearIcon from '../date-picker/icons/clear-icon.vue';
import MoreIcon from '../date-picker/icons/more-icon.vue';
import AscendOrderIcon from '../date-picker/icons/ascend-order-icon.vue';
import DescendOrderIcon from '../date-picker/icons/descend-order-icon.vue';
import Selector from '../selector';
import DatePicker from '../date-picker';
import ThemeList from './theme-list.vue';
import props from './props';

const fullConditionList = [
    {
        label: '状态：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '项目重要级别：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '项目经理：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '一级分类：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '二级分类：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '归口小组：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '归口部门：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '申请时间：',
        value: {start: '', end: ''},
        componentType: 'date-picker'
    },
    {
        label: '是否刚性时间项目：',
        value: [],
        placeholder: '全部',
        multiple: true,
        type: 'txt',
        componentType: 'selector'
    },
    {
        label: '',
        placeholder: '项目编号或名称',
        value: '',
        componentType: 'input',
    }
]

const DEFAULT_FILTER_FlAG = '1';

export default {
    name: 'yt-filter',
    components: {
        SuffixIcon,
        CloseNormalIcon,
        Selector,
        DatePicker,
        ClearIcon,
        MoreIcon,
        ThemeList,
        AscendOrderIcon,
        DescendOrderIcon
    },
    props: {
        ...props
    },
    data() {
        return {
            prefixClass: 'yt-filter',
            filterFieldMap: new Map(this.filterFieldConfig.data.map(filterItem => [filterItem.fieldName, filterItem])),
        }
    },
    computed: {
        displaySortText() {
            return `${this.sortFieldConfig.label}${this.sortFieldConfig.value.label}`
        },
        displayFilterList() {
            return this.filterList.map(filter => {
                this.setMoreMenuConfig(filter);
                this.setFilterConditionList(filter);
                return filter;
            })
        },
        configConditionList() {
            const res = this.curFilter.filterConditionList.filter(filterConditionItem => filterConditionItem.componentType !== 'input');
            console.log('res', res);
            return res
        },
        curFilter() {
            
            const filter = this.displayFilterList.find((filter => filter.defaultFlag === DEFAULT_FILTER_FlAG));
            console.log('curFilter:', filter )
            return filter;
        },
        
    },
    watch: {
        
    },
    methods: {
        isDefaultFilter(filter) {
            return filter.defaultFlag === DEFAULT_FILTER_FlAG;
        },
        getDefaultFilter(filterList) {
            return filterList.find((filter => filter.defaultFlag === DEFAULT_FILTER_FlAG));
        },
        setMoreMenuConfig(filter) {
            this.$set(filter, 'moreMenuConfig', filter.id === null 
                ? [
                        {
                            label: '设为默认',
                            value: 'default',
                            disabled: filter.defaultFlag === DEFAULT_FILTER_FlAG,
                        },
                ] 
                : [
                    {
                        label: '设为默认',
                        value: 'default',
                        disabled: filter.defaultFlag === DEFAULT_FILTER_FlAG,
                    },
                    {
                        label: '重命名',
                        value: 'rename',
                        disabled: false,
                    },
                    {
                        label: '删除',
                        value: 'delete',
                        disabled: false,
                    }
                ]
            );
        },
        setFilterConditionList(filter) {
            const filterContent = JSON.parse(filter.filterContent);
            this.$set(filter, 'filterConditionList', [...filterContent.map(filterContentItem => {
                if (filterContentItem.fieldName === 'applicationDate') {
                    return {
                        ...filterContentItem,
                        label: '申请时间：',
                        value: { start: '', end: '' }, // todo 先写成默认值，等删除数据再改
                        componentType: 'date-picker'
                    };
                    
                }
                return {
                    ...filterContentItem,
                    label: this.getLabel(filterContentItem),
                    placeholder: '全部',
                    multiple: true,
                    type: 'txt',
                    componentType: 'selector'
                }
            }),  {
                label: '',
                placeholder: '项目编号或名称',
                value: '',
                componentType: 'input',
            }])
        },
        getLabel(filterContentItem) {
            const filterFieldItem = this.filterFieldMap.get(filterContentItem.fieldName);
            if (filterFieldItem && filterFieldItem.label) {
                return `${filterFieldItem.label}：`;
            }
            return '';
        },
        handleConditionChange(condition) {
            const index = this.curFilter.filterConditionList.findIndex(filterConditionItem => filterConditionItem.fieldName === condition.fieldName);
            this.curFilter.filterConditionList.splice(index, 1, condition.fieldName === 'applicationDate' ? {
                fieldName: condition.fieldName,
                label: '申请时间：',
                value: { start: '', end: '' }, 
                componentType: 'date-picker'
            } : {
                value: [],
                fieldName: condition.fieldName,
                label: this.getLabel(condition),
                placeholder: '全部',
                multiple: true,
                type: 'txt',
                componentType: 'selector'
            })
        }
    }
}
</script>