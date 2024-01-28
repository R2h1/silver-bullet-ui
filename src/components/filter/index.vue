<template>
    <div class="yt-filter-list">
        <YtFilter :filterList="filterList" 
          :filterFieldConfig="filterFieldConfig" 
          :sortFieldConfig="sortFieldConfig"
        />
    </div>
</template>

<script>
import YtFilter from './filter.vue';
import { filterItemList, filterList, sortFieldList  } from './mock';

export default {
  components: {
    YtFilter,
  },
  data() {
    return {
      filterList: filterList,
      filterFieldConfig: {
          value: '',
          placeholder: '请选择',
          multiple: false,
          valueField: 'fieldName',
          data: filterItemList,
      },
      sortFieldConfig: {
          ascend: true,
          label: '按',
          value: {
              label: '项目编号',
              fieldName: 'projectNo',
          },
          data: sortFieldList,
          valueField: 'fieldName',
      },
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "theme-list.scss";
@import "index.scss";

.yt-filter-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>