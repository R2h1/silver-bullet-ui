<template>
  <div class="dept-cascader">
    <span v-if="title" class="dept-cascader__title">{{ title }}</span>
    <el-cascader
      ref="cascader"
      v-model="selectedPath"
      :options="options"
      :props="cascaderProps"
      :popper-class="popperClass"
      :append-to-body="false"
      size="small"
    />
  </div>
</template>

<script>
export default {
  name: "DeptCascader",
  props: {
    title: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    labelField: {},
  },
  data() {
    return {
      selectedPath: this.value,
      cascaderProps: {
        checkStrictly: true, // 启用严格单选模式
        label: "label",
        value: "id",
        children: "children",
      },
      popperClass: "dept-cascader__popper",
    };
  },
  watch: {
    value(newVal) {
      this.selectedPath = newVal;
    },
    selectedPath(newVal) {
      this.$emit("input", newVal);
      this.$emit("change", newVal);
      this.$refs.cascader.dropDownVisible = false;
    },
  },
};
</script>

<style>
.dept-cascader {
  display: flex;
  align-items: center;
  height: 28px;
  position: relative;
}

.dept-cascader__title {
  flex-shrink: 0;
  font-size: 14px;
  color: #606266;
}

/* 无边框输入框 */
.dept-cascader .el-cascader .el-input__inner {
  border: none !important;
  padding-left: 5px;
}
</style>
