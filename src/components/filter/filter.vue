<template>
    <div ref="filter" :class="`${prefixClass}`">
        <div :class="`${prefixClass}__header`">
            <div :class="`${prefixClass}__header--front`">
                <el-popover
                    v-if="filterList.length"
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
                        <theme-list 
                            v-model="curDisplayFilter"
                            @change="handleFilterChange" 
                            :data="displayFilterList" 
                            valueField="id"
                        >
                            <template #default="{ current, index }">
                                <el-tooltip 
                                    :content="current.name"
                                    placement="right"
                                    :popper-class="`${prefixClass}__item-name-tooltip`"
                                    :disabled="current.isDisabledTooltip" >
                                    <span :class="[`${prefixClass}__list--item-name`, {
                                        'is-default': isDefaultFilter(current),
                                    }] ">
                                        {{ current.name }}
                                    </span>
                                </el-tooltip>
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
                                            <span :class="{ 'is-delete': configItem.value === 'remove'}"> {{ configItem.label }} </span>
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
                    v-if="sortFieldConfig.data"
                    :popper-class="`${prefixClass}__sort-list-popper`"
                    placement="bottom-end"
                    :visible-arrow="false"
                    v-model="popperVisible.sort"
                    :append-to-body="false"
                > 
                    <span :class="`${prefixClass}__content-operate-item`" slot="reference" >
                        {{ displaySortText }} 
                        <suffix-icon />
                    </span>
                    <div :class="`${prefixClass}__sort-list`">
                        <theme-list 
                            v-model="sortFieldConfig.value" 
                            @change="handleSortFieldChange"  
                            v-bind="sortFieldConfig"
                            :data="sortFieldConfig.data" >
                                <template #default="{ current }"  >
                                    {{ current.label }}
                                </template>
                            </theme-list>
                    </div>
                </el-popover>
                <ascend-order-icon :class="`${prefixClass}__content-operate-item--icon`" @click.native="() => handleSortOrderChange(false)"  v-if="sortFieldConfig.ascend"/>
                <descend-order-icon :class="`${prefixClass}__content-operate-item--icon`" v-else @click.native="() => handleSortOrderChange(true)"/>
                <span :class="[`${prefixClass}__content-operate-item`, 
                    { 
                        'is-loading': exportConfig.loading,
                        'is-disabled': exportConfig.disabled, 
                    }]" @click="handleExportClick" >
                    
                    <cloud-icon v-if="!exportConfig.loading" class="prefix"/>
                    <loading-icon v-else class="prefix loading" />
                    {{ `${exportConfig.label}${exportConfig.loading ? '中' : ''}` }}
                </span>

                <el-popover
                    :popper-class="`${prefixClass}__display-setting-popper`"
                    placement="bottom-end"
                    :visible-arrow="false"
                    @show="handleShowDisplaySetting"
                    @hide="handleSaveDisplaySetting"
                    v-model="popperVisible.displaySetting"
                > 
                    <span :class="`${prefixClass}__content-operate-item`" slot="reference" >
                        <setting-icon class="prefix"/>
                        {{ '显示设置' }} 
                    </span>
                    <div :class="`${prefixClass}__display-setting-popper--header`">
                        <div :class="`${prefixClass}__display-setting-popper--header-item`" 
                            :key="item[displaySettingConfig.valueField]" 
                            v-for="item in displaySettingConfig.cannotHiddenColumnList">
                            {{ item.label }}
                        </div>
                    </div>
                    <ThemeList :class="`${prefixClass}__display-setting`" 
                        multiple
                        canDraggable
                        @change="handleDisplaySettingChange"
                        v-bind="displaySettingConfig"
                        v-model="displaySettingConfig.value"
                        :data="displaySettingConfig.data"
                        @drag-end="handleDragend"></ThemeList>
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
                                    v-model="condition.fieldName"
                                >
                                    <chevron-down-icon slot="suffix" />
                                </Selector>
                                <Selector 
                                    :class="`${prefixClass}__condition-config--item-back`" 
                                    v-if="condition.componentType === 'selector'"
                                    :disabled="!condition.fieldName"
                                    :append-to-body="true"
                                    v-bind="condition"
                                    :data="getSelectorData(condition.fieldName)"
                                    v-model="condition.value"
                                    :popper-class="`${prefixClass}__condition-config--popper-back`"
                                    :popper-auto-width="false"
                                    :popper-width="354"
                                    @focus="() => handleSelectorFocus('config', condition.fieldName)"
                                    @remote-search="(keyword) => handleSelectorRemoteSearch(condition.fieldName, keyword)"
                                    @load-more="(keyword) => handleSelectorLoadMore(condition.fieldName, keyword)"
                                    @select-list-change="handleSelectedListChange"
                                    @load-node="handleLoadNode"
                                    >
                                    <chevron-down-icon slot="suffix" />
                                </Selector>
                                <DatePicker 
                                    :class="`${prefixClass}__condition-config--item-back`"
                                    :popper-class="`${prefixClass}__date-popper`"
                                    v-else-if="condition.componentType === 'date-picker'"
                                    :isInputFitContent="false"
                                    v-bind="condition"
                                    @start-change="handleDateChange"
                                    @end-change="handleDateChange"/>
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
                <Remove 
                        @remove="handleConditionRemove(index)" 
                        v-if="condition.componentType === 'selector'" 
                        :key="`${condition.fieldName}`">
                    <Selector 
                        showLabel 
                        :class="`${prefixClass}__condition-selector-item`" 
                        v-bind="condition"
                        @load-more="(keyword) => handleSelectorLoadMore(condition.fieldName, keyword)"
                        @remote-search="(keyword) => handleSelectorRemoteSearch(condition.fieldName, keyword)"
                        @focus="() => handleSelectorFocus('display', condition.fieldName)"
                        :popper-auto-width="false"
                        v-model="condition.value"
                        :popper-class="`${prefixClass}__condition-selector-item--popper`"
                        size="mini"
                        :data="getSelectorData(condition.fieldName)"
                        @select-list-change="handleSelectedListChange"
                        @load-node="handleLoadNode"
                        autoWidth
                    >
                        <suffix-icon slot="suffix" />
                    </Selector>
                </Remove>
                <Remove @remove="handleConditionRemove(index)" v-else-if="condition.componentType === 'date-picker'" :key="`${condition.fieldName}`">
                    <DatePicker 
                        showLabel 
                        :class="`${prefixClass}__condition-date-picker-item`"
                        :popper-class="`${prefixClass}__date-popper`"
                        v-bind="condition"
                        @start-change="handleDateChange"
                        @end-change="handleDateChange" />
                </Remove>
                <el-input 
                    ref="elInput"
                    :class="`${prefixClass}__condition-input-item`"
                    v-else-if="condition.componentType === 'input'"
                    :placeholder="condition.placeholder" 
                    :key="`${condition.fieldName}`"
                    v-model="condition.value"
                    @input="handleInput"
                    @focus="inputFocus = true"
                    @blur="inputFocus = false"
                    @mouseenter.native="inputEnter = true"
                    @mouseleave.native="inputEnter = false"
                >
                    <clear-icon
                        :class="`${prefixClass}__condition-input-item--clear-icon`"
                        @click.native="handleClearIconClick(condition)" 
                        v-if="showInputClearIcon(condition)" slot="suffix"/>
                    <search-icon  v-else slot="suffix" />
                </el-input>
            </template>
        </div>
    </div>
</template>

<script>
import { 
    Input as ElInput, 
    Button as ElButton, 
    Popover as ElPopover, 
    Tooltip as ElTooltip 
} from 'element-ui';
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
    CloudIcon,
    LoadingIcon,
    ChevronDownIcon
} from '../icons';
import Selector from '../selector';
import DatePicker from '../date-picker';
import ThemeList from './theme-list.vue';
import Remove from '../remove/remove.vue';
import props from './props';

const DEFAULT_FILTER_FlAG = '1';
const CHANGED_SELECTED_ID = 'yt-filter__' + Date.now();

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
        LoadingIcon,
        ChevronDownIcon,
        Selector,
        DatePicker,
        ThemeList,
        Remove,
        ElInput,
        ElButton,
        ElPopover,
        ElTooltip
    },
    props: {
        ...props
    },
    data() {
        return {
            prefixClass: 'yt-filter',
            curDisplayFilter: null,
            filterStore: new Map(),
            popperVisible: {
                sort: false,
                condition: false,
                filter: false,
                displaySetting: false
            },
            isDisplaySettingChange: false,
            inputFocus: false,
            inputEnter: false,
            changedSelectedId: CHANGED_SELECTED_ID, // 避免共享数据的选择器重复触发 change
            canTriggerModifyBySelector: true, // 排除掉更改选择器已选列表之外的动作触发 select-list-change
        }
    },
    created() {
        // 初始设置为默认筛选器
        this.curDisplayFilter = this.getDefaultFilter(this.filterList);
    },  
    mounted() {
        const root = this.$refs.filter;
        const { left } = root.getBoundingClientRect();
        document.body.style.setProperty('--yt-filter-name-tooltip-left', `${left + 280}px`);
    },
    beforeDestroy() {
        document.body.style.removeProperty('--yt-filter-name-tooltip-left');
    },
    computed: {
        displayFilterList() {
            const res = this.filterList.map(filter => {
                return this.initDisplayFilter(filter);
            })
            return res;
        },
        displaySortText() {
            return `${this.sortFieldConfig.label ? this.sortFieldConfig.label : ''}${this.sortFieldConfig.value && this.sortFieldConfig.value.label ? this.sortFieldConfig.value.label : ''}`
        },
        displayFilterFieldConfigOptions() {
            const configFieldNames = this.configConditionList.map((item => item.fieldName));
            const disableUpdated = this.filterFieldConfig.data ? this.filterFieldConfig.data.map((filterItem) => {
                return {
                    ...filterItem,
                    disabled: configFieldNames.includes(filterItem.fieldName),
                }
            }) : [];
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
                    item => item && item.componentType !== 'input');
            return res
        },
        configValidConditionList() {
            const res = this.configConditionList.filter(item => item.fieldName);
            // console.log('configValidConditionList：', res);
            return res
        },
        validConditionList() {
            if (!this.curDisplayFilter.filterConditionList) {
                return [];
            }
            const res = this.curDisplayFilter.filterConditionList.filter(item => item && item.fieldName);
            // console.log('validConditionList：', res);
            return res;
        },
        defaultFilterId() {
            const defaultFilter = this.getDefaultFilter(this.filterList);
            return defaultFilter.id;
        },
        filterFieldMap() {
            return this.filterFieldConfig.data 
                ? new Map(this.filterFieldConfig.data.map(filterItem => [filterItem.fieldName, filterItem])) 
                : new Map()
        },
    },
    watch: {
        filterList: {
            handler(newValue, oldValue) {
                this.curDisplayFilter = this.getDefaultFilter(this.displayFilterList);
                if (this.canTriggerModifyBySelector || newValue === oldValue) {
                    return;
                }
                const storageId = this.generateStorageId(this.curDisplayFilter, this.scene);
                const filterConditionList = this.filterStore.get(storageId)
                if (filterConditionList) {
                    const temp = JSON.parse(filterConditionList);
                    temp.forEach((item) => {
                        if (item.componentType === 'selector') {
                            item.selectedValueSet = new Set(item.value);
                        }
                    })
                    this.curDisplayFilter.filterConditionList = temp;
                    this.curDisplayFilter.isModify = true;
                }
                this.$emit('change', {
                    filter: this.curDisplayFilter, 
                    type: 'modify'
                });
            },
        },
        scene: {
            handler() {
                this.changedSelectedId = CHANGED_SELECTED_ID;
                this.canTriggerModifyBySelector = false;
                this.sortFieldConfig.ascend = false;
                this.sortFieldConfig.value = this.sortFieldConfig.data[0];
            },
        },
        defaultFilterId: {
            handler(newId, oldId) {
                if (!this.canTriggerModifyBySelector) {
                    return;
                }
                if (oldId !== undefined) {  // 非初始化
                    this.changedSelectedId = CHANGED_SELECTED_ID;
                    this.canTriggerModifyBySelector = false;
                    this.resetFilter(this.curDisplayFilter); // 重置当前筛选器
                }
                this.curDisplayFilter = this.getDefaultFilter(this.displayFilterList);
                this.$emit('change', {
                    type: 'modify',
                    filter: this.curDisplayFilter, 
                })
            }
        },
        
    },
    methods: {
        isDefaultFilter(filter) {
            return filter.defaultFlag === DEFAULT_FILTER_FlAG;
        },
        getDefaultFilter(filterList) {
            return filterList.find(filter => filter.defaultFlag === DEFAULT_FILTER_FlAG) || {};
        },
        initDisplayFilter(filter) { // 初始化展示筛选器
            this.initMoreMenuConfig(filter);
            if (!filter.filterConditionList) {
                this.initIsModify(filter);
                this.initFilterConditionList(filter);
            }
            this.initIsDisabledTooltip(filter);
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
            this.$set(filter, 'moreMenuConfig', filter.id 
                ? [
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
                        value: 'remove',
                        disabled: false,
                    }
                ] : [
                        {
                            label: '设为默认',
                            value: 'asDefault',
                            disabled: filter.defaultFlag === DEFAULT_FILTER_FlAG,
                        },
                ]
            );
        },
        initFilterConditionList(filter) {
            this.$set(filter, 'filterConditionList', this.parseFilterContent(filter));
        },
        parseFilterContent(filter) { // 解析得到初始筛选条件列表
            try {
                const filterContent = JSON.parse(filter.filterContent);
                return [...filterContent.filter(filterContentItem => this.filterFieldMap.has(filterContentItem.fieldName)).map((filterContentItem, index) => {
                    const selectorConfigMap = this.filterFieldConfig.selectorConfig;
                    const datePickerFieldNames = Object.values(selectorConfigMap)
                        .filter(item => item.componentType === 'date-picker')
                        .map(item => item.fieldName);
                    const selectorConfig = selectorConfigMap ? selectorConfigMap[filterContentItem.fieldName] : {};
                    if (datePickerFieldNames.includes(filterContentItem.fieldName)) {
                        return {
                            ...selectorConfig,
                            ...filterContentItem,
                            sort: index + 1,
                            label: this.getLabel(filterContentItem),
                            value: { start: filterContentItem.value[0] || '', end: filterContentItem.value[1] || '' }
                        };
                    }
                    return {
                        ...selectorConfig,
                        label: this.getLabel(filterContentItem),
                        sort: index + 1,
                        value: filterContentItem.value.map(item => item.value),
                        selectedValueSet: new Set(filterContentItem.value.map(item => item.value)),
                        selectedList: filterContentItem.value
                    }
            }),  this.filterFieldConfig.inputConfig]
            } catch (e) {
                return [];
            }
        },
        getLabel(filterContentItem) {
            const filterFieldItem = this.filterFieldMap.get(filterContentItem.fieldName);
            if (filterFieldItem && filterFieldItem.label) {
                return `${filterFieldItem.label}：`;
            }
            return '';
        },
        handleConditionChange(condition, index) {
            const selectorConfigMap = this.filterFieldConfig.selectorConfig;
            const datePickerFieldNames = Object.values(selectorConfigMap)
                .filter(item => item.componentType === 'date-picker')
                .map(item => item.fieldName);
            const selectorConfig = selectorConfigMap[condition.fieldName];
            let filterCondition;
            if (datePickerFieldNames.includes(condition.fieldName)) {
                filterCondition = {
                    ...selectorConfig,
                    fieldName: condition.fieldName,
                    sort: index + 1,
                    label: this.getLabel(condition),
                    value: { start: '', end: '' },
                };
            } else {
                filterCondition = {
                    ...selectorConfig,
                    value: [],
                    sort: index + 1,
                    fieldName: condition.fieldName,
                    label: this.getLabel(condition),
                    selectedValueSet: new Set(),
                    selectedList: [],
                }   
            }
            this.curDisplayFilter.filterConditionList.splice(index, 1, filterCondition);
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
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
            const list = this.curDisplayFilter.filterConditionList;
            list.splice(index, 1);
            list.forEach((item, index) => {
                item.sort = index + 1;
            })
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleSaveNew() { // 将当前筛选器的更改保存为新筛选器
            this.changedSelectedId = CHANGED_SELECTED_ID;
            this.canTriggerModifyBySelector = false;
            this.removeStorageFilter(this.curDisplayFilter)
            this.$emit('save', {
                filter: this.curDisplayFilter, 
                type: 'create',
            });
        },
        handleSaveModify() { // 保存当前筛选器的更改
            this.removeStorageFilter(this.curDisplayFilter)
            this.$emit('save', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleReset() { // 重置当前筛选器
            this.changedSelectedId = CHANGED_SELECTED_ID;
            this.canTriggerModifyBySelector = false;
            this.resetFilter(this.curDisplayFilter);
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
            this.$emit('save', {
                type: 'reset',
                filter: this.curDisplayFilter, 
            });
        },
        resetFilter(filter) { // 重置某个筛选器
            filter.filterConditionList = this.parseFilterContent(filter);
            filter.isModify = false;
            this.removeStorageFilter(filter);
        },
        handleVisible(index) {
            this.displayFilterList.forEach((item, i) => {
                if (i !== index) {
                    item.moreMenuPopperVisible = false;
                }
            })
        },
        initIsDisabledTooltip(filter) {
            const { name } = filter;
            const maxWidth =  this.isDefaultFilter(filter) ? 186 : 200;
            const textWidth = this.getActualWidthOfChars(name);
            filter.isDisabledTooltip = textWidth < maxWidth;
        },
        getActualWidthOfChars(text, options = {}) {
            const { size = 14, family = "PingFang SC" } = options;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.font = `${size}px ${family}`;
            const metrics = ctx.measureText(text);
            const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
            return Math.max(metrics.width, actual);
        },
        handleSortFieldChange() {
            this.popperVisible.sort = false;
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'sort-field'
            })
        },
        handleSortOrderChange(isAscend) {
            this.sortFieldConfig.ascend = isAscend;
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'order-type'
            })
        },
        handleDisplaySettingChange(values, value) {
            this.isDisplaySettingChange = true;
            this.$emit('display-setting', {
                filter: this.curDisplayFilter, 
                type: 'toggle',
                value,
            })
        },
        handleShowDisplaySetting() {
            this.isDisplaySettingChange = false;
        },
        handleSaveDisplaySetting() {
            if (this.isDisplaySettingChange) {
                this.$emit('save', {
                    filter: this.curDisplayFilter, 
                    type: 'display'
                })
            }
        },
        handleDragend(value) {
            this.isDisplaySettingChange = true;
            this.$emit('display-setting', {
                type:  'sort',
                filter: this.curDisplayFilter,
                value
            })
        },
        handleFilterChange(filter, oldFilter) {
            this.popperVisible.filter = false;
            this.displayFilterList.forEach((item) => item.moreMenuPopperVisible = false);
            // 重置旧筛选器
            this.resetFilter(oldFilter);
            this.changedSelectedId = CHANGED_SELECTED_ID;
            this.canTriggerModifyBySelector = false;
            this.$emit('change', {
                filter: filter, 
                type: 'modify'
            });
        },
        generateStorageId(filter, scene) {
            return `${scene}_${filter.id}`;
        },
        storageFilter(filter) { // 本地存储筛选器
            const storageId = this.generateStorageId(filter, this.scene);
            this.filterStore.set(storageId, JSON.stringify(filter.filterConditionList));
        },
        removeStorageFilter(filter) {
            const storageId = this.generateStorageId(filter, this.scene);
            this.filterStore.delete(storageId);
        },
        handleMenuItemClick(filter, option) {
            filter.moreMenuPopperVisible = false;
            this.popperVisible.filter = false;
            this.$emit('save', {
                filter, 
                type: option.value,
                defaultFilter: this.getDefaultFilter(this.filterList)
            })
        },
        handleDateChange() {
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleSelectedListChange(value) {
            if (!this.canTriggerModifyBySelector) {
                this.$nextTick(() => {
                    this.canTriggerModifyBySelector = true;
                })
                return;
            }
            const oldValue = this.changedSelectedId;
            this.changedSelectedId = JSON.stringify(value);
            if (this.changedSelectedId === oldValue) {
                this.changedSelectedId = CHANGED_SELECTED_ID;
                return;
            }
            this.curDisplayFilter.isModify = true;
            this.storageFilter(this.curDisplayFilter);
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleInput() {
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleSelectorFocus(type, fieldName) {
            this.popperVisible.filter = false;
            if (type === 'display') {
                this.popperVisible.condition = false;
            }
            this.$emit('selector-data-change', {
                type: 'focus', 
                fieldName,
            })
        },
        handleSelectorLoadMore(fieldName, keyword) {
            this.$emit('selector-data-change', {
                type: 'load-more',
                fieldName, 
                keyword
            });
        },
        handleSelectorRemoteSearch(fieldName, keyword) {
            this.$emit('selector-data-change', {
                type: 'remote-search',                 
                fieldName, 
                keyword
            });
        },
        handleExportClick() {
            const { loading, disabled } = this.exportConfig;
            if (!loading && !disabled) {
                this.$emit('export');
            }
        },
        getSelectorData(fieldName) {
            const selectorConfig = this.filterFieldConfig.selectorConfig;
            if (selectorConfig && selectorConfig[fieldName]) {
                return selectorConfig[fieldName].data
            }
            return [];
        },
        // input 相关逻辑
        showInputClearIcon(condition) {
            return condition.value && (this.inputFocus || this.inputEnter)
        },
        handleClearIconClick(condition) {
            condition.value = '';
            this.$refs.elInput[0].focus();
            this.$emit('change', {
                filter: this.curDisplayFilter, 
                type: 'modify'
            });
        },
        handleLoadNode({ data, node}) {
            this.$emit('selector-data-change', {
                type: 'load-node', 
                data,
                node,
            })
        }
    }
}
</script>