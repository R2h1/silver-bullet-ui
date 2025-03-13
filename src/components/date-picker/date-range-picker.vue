<template>
  <div class="custom-date-range">
    <span class="title-label">{{ title }}</span>
    <el-date-picker
      v-model="selectedDate"
      type="daterange"
      :clearable="false"
      start-placeholder="请选择"
      end-placeholder="请选择"
      range-separator="至"
      :picker-options="pickerOptions"
      class="no-border-picker"
      @change="handleChange"
      size="small"
    />
  </div>
</template>

<script>
export default {
  name: "CustomDateRange",
  props: {
    title: {
      type: String,
      default: "统计区间：",
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedDate: this.value,
      pickerOptions: {
        shortcuts: this.createShortcuts(),
        panelFooter: {
          render: (h) => this.renderPanelFooter(h),
        },
      },
    };
  },
  watch: {
    value(newVal) {
      this.selectedDate = newVal;
    },
  },
  methods: {
    renderPanelFooter(h) {
      return h("div", { class: "panel-footer" }, [
        h(
          "el-button",
          {
            props: { size: "mini" },
            on: {},
          },
          "清空"
        ),
        h(
          "el-button",
          {
            props: { type: "primary", size: "mini" },
            style: { "margin-left": "8px" },
            on: {},
          },
          "确定"
        ),
      ]);
    },
    createShortcuts() {
      return [
        { text: "最近一周", onClick: this.pickLastWeek },
        { text: "最近一月", onClick: this.pickLastMonth },
        { text: "最近半年", onClick: this.pickLastHalfYear },
        { text: "最近一年", onClick: this.pickLastYear },
      ];
    },
    pickLastWeek(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
      picker.$emit("pick", [start, end]);
    },
    pickLastMonth(picker) {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      picker.$emit("pick", [start, end]);
    },
    pickLastHalfYear(picker) {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      picker.$emit("pick", [start, end]);
    },
    pickLastYear(picker) {
      const end = new Date();
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      picker.$emit("pick", [start, end]);
    },
    handleChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>

<style>
.custom-date-range {
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  align-items: baseline;
  height: 28px;
}

.title-label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}

.custom-date-range .el-range-editor.el-input__inner {
  padding-left: 0;
  border: none;
  width: auto;
  box-shadow: none;
}
.custom-date-range .el-date-editor .el-range__icon {
  display: none;
}
.custom-date-range .el-date-editor .el-range-input {
  text-align: left;
  width: 75px;
}
.custom-date-range .el-date-editor .el-range-separator {
  width: auto;
}
.custom-date-range .el-date-editor .el-range__close-icon {
  display: none;
}
</style>
