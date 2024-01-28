<template>
  <div
    ref="wrapper"
    :class="[`${prefixClass}__wrap`, autoWidth ? 'fit-content' : '']"
    :style="{ 
      '--select-trigger-padding-left': triggerPrefixWidth, 
      '--select-input-margin-left': inputMarginLeft,
      '--select-tags-display': type === 'tag' ? 'flex' : 'none',
      'max-width': 'var(--select-wrap-max-width)',
      '--select-popper-width': `${popperWidth}px`
  }">
      <el-select
        ref="selector"
        :class="`${prefixClass}`"
        :popper-class="`${prefixClass}__popper${popperAutoWidth ? '' : ' fixed-width'}`"
        v-model="selectedValues"
        :placeholder="type === 'tag' ? placeholder : ''"
        @focus="handleFocus"
        @change="handleSelect"
        :filterable="filterable"
        :filter-method="filterMethod"
        :multiple="multiple"
        :collapse-tags="collapseTags"
        :popper-append-to-body="false"
        :reserve-keyword="reserveKeyword"
        :size="size"
        >
        <span v-if="label" :class="`${prefixClass}__trigger-prefix`" slot="prefix" >{{ label }}</span>
        <div v-if="showPopperHeader" :class="`${prefixClass}__popper-header`">
          <div 
            :class="[`${prefixClass}__select-all`, isSelectedAll ? '' : 'is-not-selected-all']" 
            @click="selectAll" 
            v-if="multiple && showSelectAll && options.length" 
          >所有</div>
          <div 
            :class="[`${prefixClass}__select-all`, clickUnSelect ? '' : 'is-not-selected-all']" 
            @click="handleUnSelect" 
            v-if="unSelectText" 
          >{{ unSelectText }}</div>
          <el-input
            ref="search"
            v-if="showPopperSearchInput"
            placeholder="请输入内容"
            v-model="searchValue"
            :class="`${prefixClass}__popper-input`"
          > 
            <search-icon slot="prefix" :class="`${prefixClass}__popper-input-prefix`" />
            <clear-icon 
              slot="suffix"
              @click.native="searchValue = ''"
              :class="`${prefixClass}__popper-input-suffix`"  
              v-show="searchValue" />
          </el-input>

        </div>
        <div :class="`${prefixClass}__loading-wrapper`" v-if="remote && loading && options.length">
          <loading-icon :class="`${prefixClass}__loading-icon`" />
          <span :class="`${prefixClass}__loading-text`">加载中...</span>
        </div>
        <div :class="`${prefixClass}__selected`" v-if="multiple && showSelected && selectedValues.length">
          <div :class="`${prefixClass}__selected-header`">
            <span :class="`${prefixClass}__selected-count`">{{ selectedLabel }}<span v-if="showSelectedCount">: {{ validSelectedOptions.length }}</span></span>
            <el-tooltip v-if="showRemoveAllIcon" placement="top" effect="dark" :content="`清空${selectedLabel}`" >
              <RemoveAllIcon @click.native="handleClear"/>
            </el-tooltip>
            <span v-else :class="`${prefixClass}__selected-clear-btn`" @click="handleClear">清空</span>
          </div>
          
          <el-checkbox-group :class="`${prefixClass}__options-body`" v-model="selectedValues">
            <el-option v-for="item in displaySelectedOptions" :key="item[valueField]" :label="item.label" :value="item[valueField]">
              <el-checkbox style="pointer-events: none" :label="item[valueField]">
                <span> 
                    <img v-if="item.prefix" :class="`${prefixClass}__option-item-prefix`" :src="item.prefix"/>
                    <span v-if="itemType === 'tag'" :class="`${prefixClass}__option-item-label`" :style="`color: ${item.color}; background-color: ${item.bgColor}`">
                      {{ item.label }}
                    </span>
                    <span v-else>
                      {{ item.label }}
                    </span>
                  </span>
                </el-checkbox>
            </el-option>
          </el-checkbox-group>
        </div>
        <div :class="`${prefixClass}__options`">
          <span 
            :class="`${prefixClass}__options-label`" 
            v-if="optionsLabel">{{ optionsLabel }}</span>
          <template v-if="multiple">
            <el-checkbox-group :class="`${prefixClass}__options-body`"  v-model="selectedValues" v-load-more="handleLoadMore">
              <el-option v-for="item in options" :key="item[valueField]" :label="item.label" :value="item[valueField]">
                <el-checkbox  style="pointer-events: none" :label="item[valueField]">
                  <span> 
                    <img v-if="item.prefix" :class="`${prefixClass}__option-item-prefix`" :src="item.prefix"/>
                    <span v-if="itemType === 'tag'" :class="`${prefixClass}__option-item-label`" :style="`color: ${item.color}; background-color: ${item.bgColor}`">
                      {{ item.label }}
                    </span>
                    <span v-else>
                      {{ item.label }}
                    </span>
                  </span>
                </el-checkbox>
              </el-option>
            </el-checkbox-group>
          </template>
          <template v-else>
            <div :class="`${prefixClass}__options-body`" v-load-more="handleLoadMore">
              <el-option class="is-radio" v-for="item in options" :key="item[valueField]" :label="item.label" :value="item[valueField]" >
                <span> 
                  <img v-if="item.prefix" :class="`${prefixClass}__option-item-prefix`" :src="item.prefix"/>
                  <span>
                    {{ item.label }}
                  </span>
                </span>
              </el-option>
            </div>
          </template>
        </div>
        <div :class="`${prefixClass}__empty`" v-if="!options.length">暂无匹配内容</div>
        <div :class="[`${prefixClass}__popper-header`, `${prefixClass}__empty-wrapper`]" slot="empty">
          <el-input
            ref="search-empty"
            v-if="showPopperSearchInput"
            placeholder="请输入内容"
            v-model="searchValue"
            :class="`${prefixClass}__popper-input`"
          > 
            <search-icon slot="prefix" :class="`${prefixClass}__popper-input-prefix`" />
            <clear-icon 
              slot="suffix"
              @click.native="searchValue = ''"
              :class="`${prefixClass}__popper-input-suffix`"  
              v-show="searchValue" />
          </el-input>
          <div :class="`${prefixClass}__loading-wrapper`" v-if="loading">
            <loading-icon :class="`${prefixClass}__loading-icon`" />
            <span :class="`${prefixClass}__loading-text`">加载中...</span>
          </div>
          <div :class="`${prefixClass}__empty`" v-else-if="!loading && !options.length">暂无匹配内容</div>
        </div>
      </el-select>
      <div :class="`${prefixClass}__trigger-suffix`">
        <slot name="suffix">
          <suffix-icon  />
        </slot>
      </div>
      <span v-if="showSelectedTxt" :class="`${prefixClass}__selected-text`" >{{ selectedTxt }}</span>
    </div>
</template>

<script>
import LoadingIcon from './icon/loading.vue';
import SearchIcon from './icon/search.vue';
import ClearIcon from './icon/clear.vue';
import SuffixIcon from '../date-picker/icons/suffix-icon.vue';
import RemoveAllIcon from './icon/remove-all.vue'
import props from './props';

export default {
  name: 'yt-selector',
  components: {
    LoadingIcon,
    SearchIcon,
    ClearIcon,
    SuffixIcon,
    RemoveAllIcon
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefixClass: 'yt-selector',
      selectedValues: this.value || [],
      searchValue: '',
      triggerPrefixWidth: '',
      isSelectedAll: false,
      selectedOptions: [],
      clickUnSelect: false,
      optionMap: new Map(),
    }
  },
  computed: {
    displaySelectedOptions() {
      if (!this.showSelectedLimit) return this.validSelectedOptions;
      const res = this.validSelectedOptions.slice(0, this.showSelectedLimit);
      return res;
    },
    validSelectedOptions() {
      return this.selectedOptions.filter(item=> item[this.valueField]);
    },
    selectedTxt() {
      if (this.clickUnSelect) {
        return this.unSelectText;
      }
      if (this.multiple) {
        const res = this.selectedValues.map((value) => {
          const option = this.options.find(option => option[this.valueField] === value);
          return option && option.label;
        }).filter(item => item).join(',');
        return res || this.placeholder;
      }
      if (!this.selectedValues) {
        return this.placeholder
      } else {
        return ''
      }
    },
    options() {
      if (this.remote) {
        return this.data;
      }
      return this.data.filter((item) => {
          return item.label.includes(this.searchValue);
      });
    },
    showPopperHeader() {
      return (this.multiple && this.showSelectAll && this.options.length) 
        || this.showPopperSearchInput || this.unSelectText;
    },
    showSelectedTxt() {
      return !this.filterable && this.type !== 'tag'
    },
    showPopperSearchInput() {
      return !this.filterable && this.searchable;
    },
    inputMarginLeft() {
      if (this.multiple) {
        return this.selectedValues.length === 0 ? 0 : '8px'
      }
      return 0;
    },
    isUnSelect() {
      if (!this.clickUnSelect) return false;
      if (this.multiple) {
        return this.selectedValues.length === 0;
      }
      return !this.selectedValues;
    }
  },
  mounted() {
    this.triggerPrefixWidth = this.getTriggerPrefixWidth();
    this.setInputInnerWidth();
  },
  updated() {
    this.triggerPrefixWidth = this.getTriggerPrefixWidth();
    this.options.forEach((item) => {
        this.optionMap.set(item[this.valueField], item);
    })
  },
  watch: {
    searchValue(val) {
      if (this.remote) {
        this.$emit('remote-search', val);
      }
    },
    options(val) {
      val.forEach((item) => {
        this.optionMap.set(item[this.valueField], item);
      })
      if (this.selectedValues.length < val.length) {
        this.isSelectedAll = false;
      }
      this.$nextTick(() => {
        if (!this.selectedOptions.length && !val.length) {
          this.$refs['search-empty'] && this.$refs['search-empty'].focus();
        } else {
          this.$refs['search'] && this.$refs['search'].focus();
        }
      });
    },
    selectedValues(val) {
      if (!this.multiple) {
        return;
      };
      if (val.length < this.options.length) {
        this.isSelectedAll = false;
      }
      this.selectedOptions = val.map((item) => {
        const option = this.optionMap.get(item);
        return option;
      });
      this.$nextTick(() => {
        this.setTagsPrefix();
        this.setInputInnerWidth();
      })
    },
  },
  directives: {
    "load-more": {
      inserted(el, binding) {
        const { value } = binding;
        el.addEventListener("scroll", function () {
            const condition = this.scrollHeight - Math.ceil(this.scrollTop) <= this.clientHeight;
            if (condition && this.scrollTop !== 0 && typeof value === 'function') {
              value();
            }
        });
      }
    }
  },
  methods: {
    filterMethod(val) {
      this.searchValue = val;
    },
    handleSelect(val) {
      this.clickUnSelect = false;
      this.$emit('change', val)
    },
    handleClear() {
      this.selectedValues = [];
    },
    getTriggerPrefixWidth() {
      const initWidth = 8;
      return `${this.label ? this.getActualWidthOfChars(this.label) + initWidth : initWidth}px`
    },
    handleLoadMore() {
      if (!this.loading) {
        this.$emit('load-more', this.searchValue);
      }
    },
    handleFocus() {
      this.$emit('focus');
    },
    selectAll() {
      if (this.selectedOptions.length < this.options.length) {
        this.options.forEach((option) => {
          if (!this.selectedValues.includes(option[this.valueField])) {
            this.selectedValues.push(option[this.valueField]);
          }
        })
        this.isSelectedAll = true;
      }
      this.clickUnSelect = false;
    },
    handleUnSelect() {
      this.selectedValues = this.multiple ? [] : '';
      this.clickUnSelect = true;
    },
    setTagsPrefix() {
      const selectorRef = this.$refs.selector;
      if (!selectorRef) return;
      const tagEls = selectorRef.$el.querySelectorAll('.el-tag:not(.v-leave)');
      Array.from(tagEls).forEach((tagEl, index) => {
        const { prefix } = this.selectedOptions[index];
        if (prefix) {
          tagEl.style.setProperty('--tag-prefix-display', 'block');
          tagEl.style.setProperty('--tag-prefix-image', `url(${prefix})`)
        }
      })
    },
    setInputInnerWidth() {
      if (!this.showSelectedTxt) return;
      const wrapperRef = this.$refs.wrapper;
      if (!wrapperRef) return;
      
      const selectedTxtEl = wrapperRef.querySelector(`.${this.prefixClass}__selected-text`);
      wrapperRef.style.setProperty('--select-input-inner-width', `${selectedTxtEl.offsetWidth}px`);
    },
    getActualWidthOfChars(text, options = {}) {
      const { size = 13, family = "PingFang SC" } = options;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = `${size}px ${family}`;
      const metrics = ctx.measureText(text);
      const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
      return Math.max(metrics.width, actual);
    }
  },
}
</script>

<style lang="scss">
@import "index.scss";
</style>