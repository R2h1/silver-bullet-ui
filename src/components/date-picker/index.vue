<template>
  <div class="box">
    <YtDatePicker
      label="申请时间："
      :appendToBody="false"
      class="item1"
      start-field="start"
      end-field="end"
      :value="dates"
    ></YtDatePicker>
    <YtDatePicker
      class="item2"
      start-field="start"
      end-field="end"
      :value="dates"
      :isInputFitContent="false"
    ></YtDatePicker>
    <YtDatePicker
      start-field="start"
      end-field="end"
      :value="dates"
    ></YtDatePicker>
    <custom-date-range
      v-model="dateRange"
      title="统计区间："
      @change="handleDateChange"
    />
  </div>
</template>

<script>
import { YtDatePicker } from "./index";
import CustomDateRange from "./date-range-picker.vue";

export default {
  components: {
    YtDatePicker,
    CustomDateRange,
  },
  data() {
    return {
      dates: {
        start: "",
        end: "",
      },
    };
  },
  watch: {
    dates: {
      handler(val, oldVal) {
        // console.error('dates change', val, oldVal)
      },
      deep: true,
    },
  },
  methods: {},
};
</script>

<style>
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item1 {
  --input-inner-height: 22px;
  --sb-date-picker-range-prefix-display: none;
}
.item2 {
  background-color: #fff;
  background-image: none;
  border: 1px solid #dfe2e6;
  border-radius: 4px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  height: 32px;
  --input-inner-height: 32px;
  --sb-date-picker-range-prefix-display: none;
}
</style>
