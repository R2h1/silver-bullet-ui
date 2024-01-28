<script setup lang="ts">
import ThemeList from "./theme-list.vue";
import Vue, {ref, watch } from 'vue';

const data = ref([{
  value: 'value1',
  label: 'label1',
}, {
  value: 'value2',
  label: 'label2',
},{
  value: 'value3',
  label: 'label3',
},{
  value: 'value4',
  label: 'label4',
}, {
  value: 'value5',
  label: 'label5',
},{
  value: 'value6',
  label: 'label6',
}
])
const value = ref(data.value[0]);

const colorInfo = ref({
  defaultColor: 'rgb(0, 0, 0, 0.9)',
  defaultBgColor: 'rgb(255, 255, 255)',
  hoverColor: 'rgb(0, 0, 0, 0.9)',
  hoverBgColor: '#e8e8e8',
  activeColor: '#1371f6',
  activeBgColor: '#dcf1ff',
});

function handleChange(val) {
  console.log('1111', val)
}
</script>

<template>
  <div class='example-wrap'>
    <div>
      <span>active 只触发一次</span>
      <span>当前值: {{ JSON.stringify(value) }}</span>
      <ThemeList style="height: 90px; overflow-y: scroll;" v-model="value" @change="handleChange" :data="data" :colorInfo="colorInfo" >
      </ThemeList>
    </div>
    <div>
      <span>active 可重复触发</span>
      <span>当前值: {{ JSON.stringify(value) }}</span>
      <ThemeList :once="false" v-model="value" @change="handleChange" :data="data" :colorInfo="colorInfo" >
      </ThemeList>
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
