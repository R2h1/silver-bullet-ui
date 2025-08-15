<script setup lang="ts">
import ThemeList from "../filter/theme-list.vue";
import Vue, { ref, watch } from "vue";

const data = ref([
  {
    value: "value1",
    label: "label",
  },
  {
    value: "value2",
    label: "label2",
  },
  {
    value: "value3",
    label: "label3",
  },
  {
    value: "value4",
    label: "label4",
  },
  {
    value: "value5",
    label: "label5",
  },
  {
    value: "value6",
    label: "label6",
  },
]);
const value = ref(data.value[0]);

const values = ref([data.value[0], data.value[1]]);

const colorInfo = ref({
  defaultColor: "rgb(0, 0, 0, 0.9)",
  defaultBgColor: "rgb(255, 255, 255)",
  hoverColor: "rgb(0, 0, 0, 0.9)",
  hoverBgColor: "#e8e8e8",
  activeColor: "#1371f6",
  activeBgColor: "#dcf1ff",
});

function handleChange(val) {
  console.log("值改变: ", val);
}
</script>

<template>
  <div class="example-wrap">
    <div>
      <span>active 只触发一次</span>
      <ThemeList
        style="height: 90px; overflow-y: scroll"
        v-model="value"
        @change="handleChange"
        :data="data"
        :colorInfo="colorInfo"
      >
      </ThemeList>
      <span>当前值: {{ JSON.stringify(value) }}</span>
    </div>
    <div>
      <span>active 可重复触发</span>
      <ThemeList
        :once="false"
        v-model="value"
        @change="handleChange"
        :data="data"
        :colorInfo="colorInfo"
      >
      </ThemeList>
      <span>当前值: {{ JSON.stringify(value) }}</span>
    </div>

    <div>
      <span>可拖拽</span>
      <ThemeList
        canDraggable
        v-model="value"
        @change="handleChange"
        :data="data"
        :colorInfo="colorInfo"
      >
      </ThemeList>
      <span>当前值: {{ JSON.stringify(value) }}</span>
    </div>

    <div>
      <span>多选</span>
      <ThemeList
        v-model="values"
        @change="handleChange"
        multiple
        :data="data"
        :colorInfo="colorInfo"
      >
      </ThemeList>
      <span>当前值: {{ JSON.stringify(values) }}</span>
    </div>
    <div>
      <span> 多选可拖拽</span>
      <ThemeList :data="data" :colorInfo="colorInfo"> </ThemeList>
      <ThemeList
        canDraggable
        v-model="values"
        @change="handleChange"
        multiple
        :data="data"
        :colorInfo="colorInfo"
      >
      </ThemeList>
      <span>当前值: {{ JSON.stringify(values) }}</span>
    </div>
  </div>
</template>

<style scoped>
.example-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
