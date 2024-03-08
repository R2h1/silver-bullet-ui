<template>
    <div :class="`${prefixClass}`">
        <div :class="`${prefixClass}__header`">
            <div :class="`${prefixClass}__header--front`">
                <el-popover
                :popper-class="`${prefixClass}__filter-list-popper`"
                placement="bottom-start"
                :visible-arrow="false"
                v-model="popperVisible.filter"
                >
                <div :class="`${prefixClass}__title-wrap`" slot="reference">
                    <span :class="`${prefixClass}__title`">{{ curDisplayFilter.name }}</span>
                    <span v-if="curDisplayFilter.isModify" :class="`${prefixClass}__has-modify`">已修改</span>
                    <suffix-icon />
                </div>
                <div :class="`${prefixClass}__list`">
                    <theme-list v-model="curDisplayFilter" @change="handleFilterChange" :data="displayFilterList" valueField="id">
                        <template #default="{ current, index }">
                            <span :class="`${prefixClass}__list--item-name`">
                                {{ current.name }}
                            </span>
                            <span :class="`${prefixClass}__list--item-default-tag`" v-if="isDefaultFilter(current)">默认</span>
                            <el-popover
                                :popper-class="`${prefixClass}__more-menu-popper`"
                                placement="right-start"
                                :visible-arrow="false"
                                v-model="current.moreMenuPopperVisible"
                            >
                                <more-icon @click.native.stop="handleVisible(index)" :class="`${prefixClass}__more-icon`" slot="reference"/>
    
                                <theme-list 
                                    @change="(value) => handleMenuItemClick(current, value)"
                                    :class="`${prefixClass}__more-menu`" 
                                    :data="current.moreMenuConfig"
                                    :once="false" 
                                >
                                    <template #default="{ current: configItem }"  >
                                        <span :class="{ 'is-delete': configItem.value === 'delete'}"> {{ configItem.label }} </span>
                                    </template>
                                </theme-list>
                            </el-popover>
                        </template>
                    </theme-list>
                </div>
                </el-popover>
                <div v-if="curDisplayFilter.isModify" :class="`${prefixClass}__filter-operate-list`">
                    <el-button @click="handleSaveNew" :class="`${prefixClass}__filter-operate-item`" plain>保存为新视图</el-button>
                    <el-button v-if="curDisplayFilter.id" @click="handleSaveModify" :class="`${prefixClass}__filter-operate-item`" plain>保存变更</el-button>
                    <el-button @click="handleReset" :class="`${prefixClass}__filter-operate-item`" plain>重置</el-button>
                </div>
            </div>
            <div :class="`${prefixClass}__content-operate-list--back`">
                <el-popover
                    :popper-class="`${prefixClass}__sort-list-popper`"
                    placement="bottom-start"
                    :visible-arrow="false"
                    v-model="popperVisible.sort"
                > 
                    <span :class="`${prefixClass}__content-operate-item`" slot="reference" >
                        {{ displaySortText }} 
                        <suffix-icon />
                    </span>
                    <div :class="`${prefixClass}__sort-list`">
                        <theme-list 
                            v-model="sortFieldConfig.value" 
                            @change="handleSortFieldChange"  v-bind="sortFieldConfig" />
                    </div>
                </el-popover>
                <ascend-order-icon :class="`${prefixClass}__content-operate-item--icon`" @click.native="() => handleSortOrderChange(false)"  v-if="sortFieldConfig.ascend"/>
                <descend-order-icon :class="`${prefixClass}__content-operate-item--icon`" v-else @click.native="() => handleSortOrderChange(true)"/>
                <span :class="`${prefixClass}__content-operate-item`" @click="handleExportClick" >
                    <cloud-icon class="prefix"/>
                    {{ '导入/导出' }} 
                </span>

                <slot>
                </slot>
                
                <el-popover
                    :popper-class="`${prefixClass}__display-setting-popper`"
                    placement="bottom-start"
                    :visible-arrow="false"
                    @show="handleShowDisplaySetting"
                    @hide="handleSaveDisplaySetting"
                    v-model="popperVisible.displaySetting"
                > 
                    <span :class="`${prefixClass}__content-operate-item`" slot="reference" >
                        <setting-icon class="prefix"/>
                        {{ '显示设置' }} 
                    </span>
                    <ThemeList :class="`${prefixClass}__display-setting`" 
                        multiple
                        canDraggable
                        @change="handleDisplaySettingChange"
                        v-bind="displaySettingConfig"
                        v-model="displaySettingConfig.value"></ThemeList>
                </el-popover>
            </div>
        </div>
        <div :class="`${prefixClass}__condition-list`">
            <el-popover
                :popper-class="`${prefixClass}__condition-config-popper`"
                placement="bottom-start"
                :visible-arrow="false"
                v-model="popperVisible.condition"
                >
                <div :class="`${prefixClass}__condition-config-trigger`" slot="reference" plain>
                    <filter-icon />
                    <span :class="`${prefixClass}__condition-config-trigger--label`">筛选 ·</span>
                    <span :class="`${prefixClass}__condition-config-trigger--count`">{{ configValidConditionList.length }}个条件</span>
                    <suffix-icon class="suffix-icon"/>
                </div>
                <div :class="`${prefixClass}__condition-config`">
                    <div :class="`${prefixClass}__condition-config--header`"> 
                        <span  :class="`${prefixClass}__condition-config--title`">筛选</span>
                        <close-normal-icon @click.native="popperVisible.condition = false" :class="`${prefixClass}__condition-config--close-icon` "/>
                    </div>
                    <div :class="`${prefixClass}__condition-config--list`">
                        <div
                            :class="`${prefixClass}__condition-config--item`" 
                            v-for="(condition, index) in configConditionList"
                            :key="`${condition.fieldName}-${index}`" > 
                                <Selector
                                    :class="`${prefixClass}__condition-config--item-front`"
                                    v-bind="filterFieldConfig"
                                    :multiple="false"
                                    :append-to-body="true"
                                    @change="handleConditionChange(condition, index)"
                                    :data="displayFilterFieldConfigOptions"
                                    v-model="condition.fieldName"/>
                                <Selector 
                                    :class="`${prefixClass}__condition-config--item-back`" 
                                    v-if="condition.componentType === 'selector'"
                                    :disabled="!condition.fieldName"
                                    :append-to-body="true"
                                    v-bind="condition"
                                    v-model="condition.value"
                                    @load-more="(keyword) => handleSelectorLoadMore(condition.fieldName, keyword)"
                                    @change="handleSelectorChange"
                                    :popper-class="`${prefixClass}__condition-config--popper-back`"
                                    :popper-auto-width="false"
                                    :popper-width="354"
                                    @focus="() => handleSelectorFocus('config', condition.fieldName)"
                                    @remote-search="(keyword) => handleSelectorRemoteSearch(condition.fieldName, keyword)"
                                    />
                                <DatePicker 
                                    :class="`${prefixClass}__condition-config--item-back`"
                                    :popper-class="`${prefixClass}__date-popper`"
                                    v-else-if="condition.componentType === 'date-picker'"
                                    :isInputFitContent="false"
                                    v-bind="condition"
                                    @start-change="handleSelectorChange"
                                    @end-change="handleSelectorChange"/>
                                <clear-icon @click.native="handleConditionRemove(index)" :class="`${prefixClass}__condition-config--item-remove`"/>
                            </div>
                    </div>
                    <el-button 
                        @click="handleConditionAdd" 
                        type="primary" 
                        icon="el-icon-plus" 
                        :class="`${prefixClass}__condition-config--add`"
                    >添加筛选条件</el-button>
                </div>
            </el-popover>
            <template v-for="(condition, index) in validConditionList" >
                <Remove @remove="handleConditionRemove(index)" v-if="condition.componentType === 'selector'" :key="`${condition.fieldName}`">
                    <Selector 
                        showLabel 
                        :class="`${prefixClass}__condition-selector-item`" 
                        v-bind="condition"
                        @load-more="(keyword) => handleSelectorLoadMore(condition.fieldName, keyword)"
                        @remote-search="(keyword) => handleSelectorRemoteSearch(condition.fieldName, keyword)"
                        :remote="['projectManager','responsibleDepartment', 'responsibleGroup'].includes(condition.fieldName)"
                        @focus="() => handleSelectorFocus('display', condition.fieldName)"
                        :popper-auto-width="false"
                        v-model="condition.value"
                        @change="handleSelectorChange"
                        autoWidth
                    />
                </Remove>
                <Remove @remove="handleConditionRemove(index)" v-else-if="condition.componentType === 'date-picker'" :key="`${condition.fieldName}`">
                    <DatePicker 
                        showLabel 
                        :class="`${prefixClass}__condition-date-picker-item`"
                        :popper-class="`${prefixClass}__date-popper`"
                        v-bind="condition"
                        @start-change="handleSelectorChange"
                        @end-change="handleSelectorChange" />
                </Remove>
                <el-input 
                    :class="`${prefixClass}__condition-input-item`"
                    v-else-if="condition.componentType === 'input'"
                    :placeholder="condition.placeholder" 
                    :key="`${condition.fieldName}`"
                    v-model="condition.value"
                    @input="handleInput"
                >
                    <search-icon slot="suffix"></search-icon>
                </el-input>
            </template>
        </div>
    </div>
</template>

<script>
import { 
    SuffixIcon,
    CloseNormalIcon,
    AscendOrderIcon,
    DescendOrderIcon,
    ClearIcon,
    MoreIcon,
    FilterIcon,
    SearchIcon,
    SettingIcon,
    CloudIcon
} from '../icons';
import Selector from '../selector';
import DatePicker from '../date-picker';
import ThemeList from './theme-list.vue';
import Remove from '../remove/remove.vue';
import props from './props';

const DEFAULT_FILTER_FlAG = '1';

export default {
    name: 'yt-filter',
    components: {
        SuffixIcon,
        CloseNormalIcon,
        AscendOrderIcon,
        DescendOrderIcon,
        ClearIcon,
        MoreIcon,
        FilterIcon,
        SearchIcon,
        SettingIcon,
        CloudIcon,
        Selector,
        DatePicker,
        ThemeList,
        Remove
    },
    props: {
        ...props
    },
    data() {
        return {
            prefixClass: 'yt-filter',
            filterFieldMap: this.filterFieldConfig.data 
                ? new Map(this.filterFieldConfig.data.map(filterItem => [filterItem.fieldName, filterItem])) 
                : new Map(),
            curDisplayFilter: null,
            popperVisible: {
                sort: false,
                condition: false,
                filter: false,
                displaySetting: false
            },
            isDisplaySettingChange: false
        }
    },
    created() {
        // 初始设置为默认筛选器
        this.curDisplayFilter = this.getDefaultFilter(this.filterList);
        this.defaultFilterToTop();
    },
    mounted() {
        window.addEventListener('beforeunload', this.beforeunloadListener);
    },
    computed: {
        displayFilterList() {
            return this.filterList.map(filter => {
                return this.initDisplayFilter(filter);
            })
        },
        displaySortText() {
            return `${this.sortFieldConfig.label ? this.sortFieldConfig.label : ''}${this.sortFieldConfig.value && this.sortFieldConfig.value.label ? this.sortFieldConfig.value.label : ''}`
        },
        displayFilterFieldConfigOptions() {
            const configFieldNames = this.configConditionList.map((item => item.fieldName));
            const disableUpdated = this.filterFieldConfig.data.map((filterItem) => {
                return {
                    ...filterItem,
                    disabled: configFieldNames.includes(filterItem.fieldName),
                }
            });
            disableUpdated.sort((a, b) => {
                if (a.disabled && !b.disabled) { // 禁用项放到后面
                    return 1;
                } else if (!a.disabled && b.disabled) { // 禁用项放到后面
                    return -1;
                } else if (a.disabled && b.disabled) { // 都是禁用项，按已选列表升序
                    const configSortA = this.configConditionList.find(item => a.fieldName === item.fieldName).sort;
                    const configSortB = this.configConditionList.find(item => b.fieldName === item.fieldName).sort;
                    if (configSortA > configSortB) { 
                        return 1;
                    } else if (configSortA < configSortB) {
                        return -1;
                    }
                    return 0;
                } else {
                    return 0;
                }
            })
            return disableUpdated;
        },
        configConditionList() {
            if (!this.curDisplayFilter.filterConditionList) {
                return [];
            }
            const res = this.curDisplayFilter.filterConditionList.filter(
                    filterConditionItem => filterConditionItem.componentType !== 'input');
            console.log('configConditionList：', res);
            return res
        },
        configValidConditionList() {
            const res = this.configConditionList.filter(item => item.fieldName);
            console.log('configValidConditionList：', res);
            return res
        },
        validConditionList() {
            if (!this.curDisplayFilter.filterConditionList) {
                return [];
            }
            const res = this.curDisplayFilter.filterConditionList.filter(item => item.fieldName);
            console.log('validConditionList：', res);
            return res;
        },
        defaultFilterId() {
            
            return this.getDefaultFilter(this.filterList).id;
        },
    },
    watch: {
        defaultFilterId: {
            handler() {
                this.defaultFilterToTop(); // 置顶默认筛选器
                this.resetFilter(this.curDisplayFilter); // 重置当前筛选器
                this.curDisplayFilter = this.getDefaultFilter(this.displayFilterList);
                this.$emit('change', this.curDisplayFilter, 'modify')
            },
        },
        idSuffix: {
            handler(newId, oldId) {
                this.defaultFilterToTop(); // 置顶默认筛选器
                this.curDisplayFilter = this.getDefaultFilter(this.displayFilterList);
                const storageId = this.curDisplayFilter.id ? this.curDisplayFilter.id : `${this.curDisplayFilter.id}_${newId}`;
                const filterConditionList = localStorage.getItem(storageId);
                if (filterConditionList) {
                    this.curDisplayFilter.filterConditionList = JSON.parse(filterConditionList);
                    this.curDisplayFilter.isModify = true;
                }
                this.$emit('change', this.curDisplayFilter, 'modify')
            },
        }
    },
    methods: {
        isDefaultFilter(filter) {
            return filter.defaultFlag === DEFAULT_FILTER_FlAG;
        },
        getDefaultFilter(filterList) {
            console.warn('getDefaultFilter：', filterList)
            return filterList.find((filter => filter.defaultFlag === DEFAULT_FILTER_FlAG)) || {};
        },
        defaultFilterToTop() {
            const defaultIndex = this.getDefaultFilterIndex(this.displayFilterList);
            const defaultFilter = this.getDefaultFilter(this.displayFilterList);
            this.displayFilterList.splice(defaultIndex, 1);
            this.displayFilterList.splice(0, 0, defaultFilter);
        },
        getDefaultFilterIndex(filterList) {
            return filterList.findIndex((filter => filter.defaultFlag === DEFAULT_FILTER_FlAG));
        },
        initDisplayFilter(filter) { // 初始化展示筛选器
            this.initIsModify(filter);
            this.initMoreMenuConfig(filter);
            this.initFilterConditionList(filter);
            this.initPopperVisible(filter);
            return filter;
        },
        initIsModify(filter) {
            this.$set(filter, 'isModify', false);
        },
        initPopperVisible(filter) {
            this.$set(filter, 'moreMenuPopperVisible', false);
        },
        initMoreMenuConfig(filter) {
            this.$set(filter, 'moreMenuConfig', filter.id === null 
                ? [
                        {
                            label: '设为默认',
                            value: 'asDefault',
                            disabled: filter.defaultFlag === DEFAULT_FILTER_FlAG,
                        },
                ]
                : [
                    {
                        label: '设为默认',
                        value: 'asDefault',
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
        initFilterConditionList(filter) {
            this.$set(filter, 'filterConditionList', this.parseFilterContent(filter));
        },
        parseFilterContent(filter) { // 解析得到初始筛选条件列表
            const filterContent = JSON.parse(filter.filterContent);
            
            return [...filterContent.map(filterContentItem => {
                if (filterContentItem.fieldName === 'applicationDate') {
                    return {
                        ...filterContentItem,
                        label: '申请时间：',
                        value: { start: filterContentItem.value[0] || '', end: filterContentItem.value[1] || '' },
                        componentType: 'date-picker'
                    };
                }
                const selectorConfig = this.filterFieldConfig.selectorConfig[filterContentItem.fieldName];
                return {
                    ...selectorConfig,
                    label: this.getLabel(filterContentItem),
                    sort: filterContentItem.sort,
                    value: filterContentItem.value.map(item => item.value),
                    selectedValueSet: new Set(filterContentItem.value.map(item => item.value)),
                    selectedList: filterContentItem.value
                }
            }),  this.filterFieldConfig.inputConfig]
        },
        getLabel(filterContentItem) {
            const filterFieldItem = this.filterFieldMap.get(filterContentItem.fieldName);
            if (filterFieldItem && filterFieldItem.label) {
                return `${filterFieldItem.label}：`;
            }
            return '';
        },
        handleConditionChange(condition, index) {
            let filterCondition;
            if (condition.fieldName === 'applicationDate') {
                filterCondition = {
                    fieldName: condition.fieldName,
                    sort: index + 1,
                    label: '申请时间：',
                    value: { start: '', end: '' }, 
                    componentType: 'date-picker'
                };
            } else {
                filterCondition = this.filterFieldConfig.selectorConfig[condition.fieldName];
                filterCondition.value = [];
                filterCondition.sort = index + 1;
                filterCondition.fieldName = condition.fieldName;
                filterCondition.label = this.getLabel(condition);
                filterCondition.selectedValueSet = new Set();
                filterCondition.selectedList = [];
            }
            this.curDisplayFilter.filterConditionList.splice(index, 1, filterCondition);
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', this.curDisplayFilter, 'modify');
        },
        handleConditionAdd() { // 添加筛选条件
            const list = this.curDisplayFilter.filterConditionList;
            if (list) {
                list.splice(list.length - 1, 0, {
                    value: [],
                    sort: list.length,
                    fieldName: '', //  初始 add 时，fieldName 为 空
                    multiple: true,
                    type: 'txt',
                    componentType: 'selector',
                    disabled: true,
                });
            }
        },
        handleConditionRemove(index) { // 删除筛选条件
            this.curDisplayFilter.filterConditionList.splice(index, 1);
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', this.curDisplayFilter, 'modify');
        },
        handleSaveNew() { // 将当前筛选器的更改保存未新筛选器
            this.$emit('save', this.curDisplayFilter, 'new');
        },
        handleSaveModify() { // 保存当前筛选器的更改
            this.$emit('save', this.curDisplayFilter, 'modify');
        },
        handleReset() { // 重置当前筛选器
            this.resetFilter(this.curDisplayFilter);
            this.$emit('save', this.curDisplayFilter, 'reset');
        },
        resetFilter(filter) { // 重置某个筛选器
            filter.filterConditionList = this.parseFilterContent(filter);
            filter.isModify = false;
            const storageId = filter.id ? filter.id : `${filter.id}_${this.idSuffix}`
            window.localStorage.removeItem(storageId)
        },
        handleVisible(index) {
            this.displayFilterList.forEach((item, i) => {
                if (i !== index) {
                    item.moreMenuPopperVisible = false;
                }
            })
        },
        handleSortFieldChange() {
            this.popperVisible.sort = false;
            this.$emit('change', this.curDisplayFilter, 'sort-field')
        },
        handleSortOrderChange(isAscend) {
            this.sortFieldConfig.ascend = isAscend;
            this.$emit('change', this.curDisplayFilter, 'order-type')
        },
        handleDisplaySettingChange() {
            this.isDisplaySettingChange = true;
            this.$emit('change', this.curDisplayFilter, 'display-setting')
        },
        handleShowDisplaySetting() {
            this.isDisplaySettingChange = false;
        },
        handleSaveDisplaySetting() {
            if (this.isDisplaySettingChange) {
                this.$emit('save', this.curDisplayFilter, 'display-setting')
            }
        },
        handleFilterChange(filter, oldFilter) {
            this.popperVisible.filter = false;
            this.$nextTick(() => {
                filter.filterConditionList = this.parseFilterContent(filter);
                this.$emit('change', filter, 'modify');
            })
            // 重置旧筛选器
            this.resetFilter(oldFilter);
        },
        storageFilter(filter) { // 本地存储筛选器
            const storageId = filter.id ? filter.id : `${filter.id}_${this.idSuffix}`;
            window.localStorage.setItem(storageId, JSON.stringify(filter.filterConditionList))
        },
        handleMenuItemClick(filter, option) {
            filter.moreMenuPopperVisible = false;
            this.popperVisible.filter = false;
            this.$emit('save', filter, option.value)
        },
        handleSelectorChange() {
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', this.curDisplayFilter, 'modify');
        },
        handleInput() {
            this.$emit('change', this.curDisplayFilter, 'modify');
        },
        handleSelectorFocus(type, fieldName) {
            if (type === 'display') {
                this.popperVisible.condition = false;
            }
            this.$emit('selector-data-change', 'focus', {
                fieldName,
            })
        },
        handleSelectorLoadMore(fieldName, keyword) {
            this.$emit('selector-data-change', 'load-more', {
                fieldName, 
                keyword
            });
        },
        handleSelectorRemoteSearch(fieldName, keyword) {
            this.$emit('selector-data-change', 'remote-search', {
                fieldName, 
                keyword
            });
        },
        handleExportClick() {
            this.$emit('export');
        },
        beforeunloadListener() {
            this.resetFilter(this.curDisplayFilter);
            window.removeEventListener('beforeunload', this.beforeunloadListener);
        },
    }
}
</script>

<style lang='scss'>
@import './index.scss';
</style>