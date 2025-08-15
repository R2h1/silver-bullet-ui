<template>
  <div
    ref="wrapper"
    :class="[
      `${prefixClass}__wrap`,
      { 'fit-content': autoWidth, 'is-disabled': disabled },
    ]"
    :style="{
      '--select-trigger-padding-left': triggerPrefixWidth,
      '--select-input-margin-left': inputMarginLeft,
      '--select-tags-display': type === 'tag' ? 'flex' : 'none',
      'max-width': 'var(--select-wrap-max-width)',
      '--select-popper-width': `${popperWidth}px`,
    }"
  >
    <el-select
      ref="selector"
      :class="`${prefixClass}`"
      :popper-class="`${popperClass} ${
        appendToBody ? '' : 'not-in-body'
      } ${prefixClass}__popper${popperAutoWidth ? '' : ' fixed-width'}`"
      v-model="selectedValues"
      :placeholder="type === 'tag' ? placeholder : ''"
      @focus="handleFocus"
      @change="handleSelect"
      :filterable="filterable"
      :filter-method="filterMethod"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      :popper-append-to-body="appendToBody"
      :reserve-keyword="reserveKeyword"
      :size="size"
      :disabled="disabled"
      @visible-change="handleVisibleChange"
    >
      <span
        v-if="showLabel && label"
        :class="`${prefixClass}__trigger-prefix`"
        slot="prefix"
        >{{ label }}</span
      >
      <div v-if="showPopperHeader" :class="`${prefixClass}__popper-header`">
        <div
          :class="[
            `${prefixClass}__select-all`,
            clickUnSelect ? '' : 'is-not-selected-all',
          ]"
          @click="handleUnSelect"
          v-if="unSelectText"
        >
          {{ unSelectText }}
        </div>
        <el-input
          ref="search"
          v-if="showPopperSearchInput"
          :placeholder="searchPlaceholder"
          v-model="searchValue"
          :class="`${prefixClass}__popper-input`"
        >
          <search-icon
            slot="prefix"
            :class="`${prefixClass}__popper-input-prefix`"
          />
          <clear-icon
            slot="suffix"
            @click.native="searchValue = ''"
            :class="`${prefixClass}__popper-input-suffix`"
            v-show="searchValue"
          />
        </el-input>
      </div>
      <div
        :class="`${prefixClass}__loading-wrapper`"
        v-if="loading && options.length"
      >
        <loading-icon :class="`${prefixClass}__loading-icon`" />
        <span :class="`${prefixClass}__loading-text`">加载中...</span>
      </div>
      <div :class="`${prefixClass}__selected`" v-if="multiple && showSelected">
        <div
          :class="[
            `${prefixClass}__selected-header`,
            { 'is-empty': !validSelectedOptions.length },
          ]"
        >
          <span :class="`${prefixClass}__selected-count`"
            >{{ selectedLabel
            }}<span v-if="showSelectedCount"
              >{{ validSelectedValues.length }}项</span
            ></span
          >
          <el-tooltip
            v-if="showRemoveAllIcon"
            placement="top"
            effect="dark"
            :content="`清空${selectedLabel}`"
          >
            <RemoveAllIcon @click.native="handleClear" />
          </el-tooltip>
          <span
            v-else-if="selectedValues.length"
            :class="`${prefixClass}__selected-clear-btn`"
            @click="handleClear"
            >清空</span
          >
        </div>

        <el-checkbox-group
          v-if="showSelected && showSelectedList && selectedValues.length"
          :class="[`${prefixClass}__options-body`, `is-selected`]"
          v-model="selectedValues"
        >
          <el-option
            v-for="item in displaySelectedOptions"
            :key="item[valueField]"
            :label="item.label"
            :value="item[valueField]"
          >
            <el-tooltip
              :content="item.label"
              placement="top"
              :disabled="isShowTooltip(item)"
            >
              <el-checkbox
                @click.prevent.native
                :label="item[valueField]"
                :style="{
                  color: itemType === 'tag' ? item.color : 'rgba(0, 0, 0, 0.9)',
                }"
              >
                <img
                  v-if="item.prefix"
                  :class="`${prefixClass}__option-item-prefix`"
                  :src="item.prefix"
                />
                <span
                  v-if="itemType === 'tag'"
                  :class="`${prefixClass}__option-item-label`"
                  :style="`color: ${item.color}; background-color: ${item.bgColor}`"
                >
                  {{ item.label }}
                </span>
                <span v-else>
                  {{ item.label }}
                </span>
              </el-checkbox>
            </el-tooltip>
          </el-option>
        </el-checkbox-group>
      </div>
      <div :class="`${prefixClass}__options`">
        <span
          :class="`${prefixClass}__options-label`"
          v-if="showOptionsLabel"
          >{{ optionsLabel }}</span
        >
        <template v-if="multiple">
          <div :class="`${prefixClass}__options-body`" v-show="showTreeData">
            <el-option value="none" style="display: none"></el-option>
            <el-tree
              :data="treeData"
              node-key="value"
              ref="tree"
              :props="defaultProps"
              :render-after-expand="false"
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              @check-change="handleCheckChange"
              @node-expand="handleNodeExpand"
              lazy
              show-checkbox
              check-strictly
            ></el-tree>
          </div>
          <el-checkbox-group
            v-show="!showTreeData"
            :class="`${prefixClass}__options-body`"
            v-model="selectedValues"
            v-load-more="handleLoadMore"
          >
            <el-option
              v-for="item in options"
              :key="item[valueField]"
              :label="item.label"
              :value="item[valueField]"
            >
              <el-tooltip
                :content="item.label"
                placement="top"
                :disabled="isShowTooltip(item)"
              >
                <el-checkbox
                  @click.prevent.native
                  :label="item[valueField]"
                  :style="{
                    color:
                      itemType === 'tag' ? item.color : 'rgba(0, 0, 0, 0.9)',
                  }"
                >
                  <img
                    v-if="item.prefix"
                    :class="`${prefixClass}__option-item-prefix`"
                    :src="item.prefix"
                  />
                  <span
                    v-if="itemType === 'tag'"
                    :class="`${prefixClass}__option-item-label`"
                    :style="`color: ${item.color}; background-color: ${item.bgColor}`"
                    >{{ item.label }}</span
                  >
                  <span v-else>{{ item.label }}</span>
                  <span
                    v-if="item.subLabel"
                    :class="`${prefixClass}__option-item-sub`"
                    :style="`padding-left: ${item.prefix ? 40 : 22}px;`"
                    >{{ item.subLabel }}</span
                  >
                </el-checkbox>
              </el-tooltip>
            </el-option>
          </el-checkbox-group>
        </template>
        <template v-else>
          <div
            :class="`${prefixClass}__options-body`"
            v-load-more="handleLoadMore"
          >
            <el-option
              :class="['is-radio', { 'is-disabled': item.disabled }]"
              v-for="item in options"
              :key="item[valueField]"
              :label="item.label"
              :value="item[valueField]"
              :disabled="item.disabled"
            >
              <el-tooltip
                :content="item.label"
                placement="top"
                :disabled="isShowTooltip(item)"
              >
                <span>
                  <img
                    v-if="item.prefix"
                    :class="`${prefixClass}__option-item-prefix`"
                    :src="item.prefix"
                  />
                  <span>
                    <span>{{ item.label }}</span>
                    <span
                      v-if="item.subLabel"
                      :class="`${prefixClass}__option-item-sub`"
                      >{{ item.subLabel }}</span
                    >
                  </span>
                </span>
              </el-tooltip>
            </el-option>
          </div>
        </template>
      </div>
      <div
        :class="`${prefixClass}__empty`"
        v-if="!options.length && !showTreeData"
      >
        暂无匹配内容
      </div>
      <div
        :class="[
          `${prefixClass}__popper-header`,
          `${prefixClass}__empty-wrapper`,
        ]"
        slot="empty"
      >
        <el-input
          ref="search-empty"
          v-if="showPopperSearchInput"
          :placeholder="searchPlaceholder"
          v-model="searchValue"
          :class="`${prefixClass}__popper-input`"
        >
          <search-icon
            slot="prefix"
            :class="`${prefixClass}__popper-input-prefix`"
          />
          <clear-icon
            slot="suffix"
            @click.native="searchValue = ''"
            :class="`${prefixClass}__popper-input-suffix`"
            v-show="searchValue"
          />
        </el-input>
        <div :class="`${prefixClass}__loading-wrapper`" v-if="loading">
          <loading-icon :class="`${prefixClass}__loading-icon`" />
          <span :class="`${prefixClass}__loading-text`">加载中...</span>
        </div>
        <div
          :class="`${prefixClass}__empty`"
          v-else-if="!loading && !options.length"
        >
          暂无匹配内容
        </div>
      </div>
    </el-select>
    <div :class="`${prefixClass}__trigger-suffix`">
      <slot name="suffix">
        <suffix-icon />
      </slot>
    </div>
    <span v-if="showSelectedTxt" :class="`${prefixClass}__selected-text`">{{
      selectedTxt
    }}</span>
  </div>
</template>

<script>
import {
  Input as ElInput,
  Select as ElSelect,
  Option as ElOption,
  Checkbox as ElCheckbox,
  CheckboxGroup as ElCheckboxGroup,
  Tooltip as ElTooltip,
  Tree as ElTree,
} from "element-ui";
import {
  LoadingIcon,
  SearchIcon,
  ClearIcon,
  SuffixIcon,
  RemoveAllIcon,
} from "../icons";
import props from "./props";

export default {
  name: "sb-selector",
  components: {
    LoadingIcon,
    SearchIcon,
    ClearIcon,
    SuffixIcon,
    RemoveAllIcon,
    ElInput,
    ElSelect,
    ElOption,
    ElCheckbox,
    ElCheckboxGroup,
    ElTooltip,
    ElTree,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefixClass: "sb-selector",
      searchValue: "",
      triggerPrefixWidth: "",
      clickUnSelect: false,
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "leaf",
      },
      checkChangeNode: null,
      checkChangeId: "",
    };
  },
  computed: {
    selectedValues: {
      get() {
        if (this.multiple) {
          return this.value || [];
        }
        return this.value;
      },
      set() {},
    },
    displaySelectedOptions() {
      if (!this.showSelectedLimit) return this.validSelectedOptions;
      const res = this.validSelectedOptions.slice(0, this.showSelectedLimit);
      return res;
    },
    validSelectedOptions() {
      const res = this.selectedList.filter((item) =>
        this.selectedValues.includes(item[this.valueField])
      );
      return res;
    },
    validSelectedValues() {
      return this.selectedValues.filter((item) => item);
    },
    selectedTxt() {
      if (this.disabled) {
        return "";
      }
      if (this.clickUnSelect) {
        return this.unSelectText;
      }
      if (this.multiple) {
        const res = this.selectedValues
          .map((value) => {
            const option = this.selectedList.find(
              (option) => option[this.valueField] === value
            );
            return option && option[this.labelField];
          })
          .filter((item) => item)
          .join(",");
        return res || this.placeholder;
      }
      if (!this.selectedValues) {
        return this.placeholder;
      } else {
        return "";
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
      return this.showPopperSearchInput || this.unSelectText;
    },
    showSelectedTxt() {
      return !this.filterable && this.type !== "tag";
    },
    showPopperSearchInput() {
      return !this.filterable && this.searchable;
    },
    inputMarginLeft() {
      if (this.multiple) {
        return this.selectedValues.length === 0 ? 0 : "8px";
      }
      return 0;
    },
    isUnSelect() {
      if (!this.clickUnSelect) return false;
      if (this.multiple) {
        return this.selectedValues.length === 0;
      }
      return !this.selectedValues;
    },
    showOptionsLabel() {
      if (!this.optionsLabel) {
        return false;
      }
      if (this.selectedValues.length) {
        return true;
      }
      if (!this.searchValue) {
        return false;
      }
      return true;
    },
    defaultExpandedKeys() {
      // 默认展开第一级
      if (!this.treeData.length) {
        return [];
      }
      return this.treeData.map((item) => {
        return item.value;
      });
    },
    defaultCheckedKeys() {
      if (!this.selectedList.length) {
        return [];
      }
      return this.selectedList.map((item) => {
        return item.value;
      });
    },
    showTreeData() {
      return this.showOptionsByTree && !this.searchValue;
    },
  },
  mounted() {
    this.triggerPrefixWidth = this.getTriggerPrefixWidth();
    this.setInputInnerWidth();
  },
  updated() {
    this.triggerPrefixWidth = this.getTriggerPrefixWidth();
    this.setInputInnerWidth();
  },
  watch: {
    searchValue(val) {
      if (this.remote) {
        this.$emit("remote-search", val);
      }
    },
    options(val) {
      this.$nextTick(() => {
        if (!this.validSelectedOptions.length && !val.length) {
          this.$refs["search-empty"] && this.$refs["search-empty"].focus();
        } else {
          this.$refs["search"] && this.$refs["search"].focus();
        }
      });
    },
    selectedValues: {
      handler(newValues, oldValues) {
        if (!this.multiple) {
          return;
        }

        this.changeSelectedList(newValues, oldValues);
        this.$emit("select-list-change", this.selectedList);

        this.$nextTick(() => {
          this.type === "tag" && this.setTagsPrefix();
          this.setInputInnerWidth();
        });
      },
    },
  },
  directives: {
    "load-more": {
      inserted(el, binding) {
        const { value } = binding;
        el.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - Math.ceil(this.scrollTop) <=
            this.clientHeight + 2;
          if (
            condition &&
            this.scrollTop !== 0 &&
            typeof value === "function"
          ) {
            value();
          }
        });
      },
    },
  },
  methods: {
    filterMethod(val) {
      this.searchValue = val;
    },
    handleSelect(val) {
      this.clickUnSelect = false;
      this.$emit("change", val);
    },
    handleCheckChange(data, checked, indeterminate) {
      if (this.selectedValues.includes(data.value) && checked) {
        return;
      }
      if (!this.selectedValues.includes(data.value) && !checked) {
        return;
      }
      const values = this.$refs.tree.getCheckedNodes().map((item) => {
        return item.value;
      });
      this.checkChangeNode = {
        ...data,
      };
      delete this.checkChangeNode.children;
      this.$emit("change", values);
    },
    handleNodeExpand(data, node, el) {
      if (node.isLeaf || data.children.length) return;
      this.$emit("load-node", { data, node });
    },
    handleClear() {
      this.selectedValues.splice(0, this.selectedValues.length);
      this.$emit("change", this.selectedValues);
    },
    getTriggerPrefixWidth() {
      const initWidth = 8;
      return `${
        this.label && this.showLabel
          ? this.getActualWidthOfChars(this.label) + initWidth
          : initWidth
      }px`;
    },
    handleLoadMore() {
      if (!this.loading) {
        this.$emit("load-more", this.searchValue);
      }
    },
    handleFocus() {
      this.$emit("focus");
    },
    handleUnSelect() {
      if (this.multiple) {
        this.selectedValues.splice(0, this.selectedValues.length);
      } else {
        this.selectedValues = "";
      }
      this.clickUnSelect = true;
    },
    setTagsPrefix() {
      const selectorRef = this.$refs.selector;
      if (!selectorRef || !this.validSelectedOptions.length) return;
      const tagEls = selectorRef.$el.querySelectorAll(".el-tag:not(.v-leave)");
      Array.from(tagEls).forEach((tagEl, index) => {
        const { prefix } = this.validSelectedOptions[index];
        if (prefix) {
          tagEl.style.setProperty("--tag-prefix-display", "block");
          tagEl.style.setProperty("--tag-prefix-image", `url(${prefix})`);
        }
      });
    },
    setInputInnerWidth() {
      if (!this.showSelectedTxt) return;
      const wrapperRef = this.$refs.wrapper;
      if (!wrapperRef) return;

      const selectedTxtEl = wrapperRef.querySelector(
        `.${this.prefixClass}__selected-text`
      );
      wrapperRef.style.setProperty(
        "--select-input-inner-width",
        `${selectedTxtEl.offsetWidth}px`
      );
    },
    getActualWidthOfChars(text, options = {}) {
      const { size = 14, family = "PingFang SC" } = options;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = `${size}px ${family}`;
      const metrics = ctx.measureText(text);
      const actual =
        Math.abs(metrics.actualBoundingBoxLeft) +
        Math.abs(metrics.actualBoundingBoxRight);
      return Math.max(metrics.width, actual);
    },
    changeSelectedList(newValues, oldValues) {
      if (newValues.length === 0) {
        // 清空
        this.selectedList.splice(0, this.selectedList.length);
        this.selectedValueSet.clear();
        this.$refs.tree.setCheckedKeys(newValues);
      } else if (newValues.length > oldValues.length) {
        // 新增
        const value = newValues.find((value) => !oldValues.includes(value)); // 新增的值
        if (value) {
          const option =
            this.showOptionsByTree && !this.searchValue
              ? this.checkChangeNode
              : this.options.find(
                  (option) => option[this.valueField] === value
                );
          this.$refs.tree.setCheckedKeys(newValues);
          if (option && !this.selectedValueSet.has(value)) {
            this.selectedList.push(option);
            this.selectedValueSet.add(value);
          }
        }
      } else if (newValues.length < oldValues.length) {
        // 取消
        const value = oldValues.find((value) => !newValues.includes(value)); // 取消的值
        if (value) {
          const index = this.selectedList.findIndex(
            (option) => option[this.valueField] === value
          );
          this.$refs.tree.setCheckedKeys(newValues);
          if (index !== -1) {
            this.selectedList.splice(index, 1);
            this.selectedValueSet.delete(value);
          }
        }
      }
    },
    isShowTooltip(item) {
      if (this.popperAutoWidth) {
        return true;
      }
      let maxWidth;
      if (item.prefix) {
        maxWidth = this.popperWidth - 70;
      } else {
        maxWidth = this.popperWidth - 50;
      }
      if (!this.multiple) {
        maxWidth += 38;
      }
      return this.getActualWidthOfChars(item.label) < maxWidth;
    },
    handleVisibleChange(visible) {
      if (!visible) {
        // 下拉框隐藏时，清空搜索词
        if (this.searchValue) {
          this.searchValue = "";
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
