<template>
    <div class="yt-filter-list">
        <el-tabs v-model="menuTabCode" @tab-click="handleMenuTabClick">
          <el-tab-pane label="我的待办" name="0"></el-tab-pane>
          <el-tab-pane label="我的已办" name="1"></el-tab-pane>
        </el-tabs>
        <YtFilter :filterList="filterList" 
          :filterFieldConfig="filterFieldConfig" 
          :sortFieldConfig="sortFieldConfig"
          :idSuffix="menuTabCode"
          :displaySettingConfig="displaySettingConfig"
          @change="handleChange"
          @save="handleSave"
          @selector-data-change="handleSelectorDataChange"
        />
        <div>当前的 filterContent：{{ result }}</div>
        <div>排序字段：{{ sortFieldConfig.value.label }} - {{ sortFieldConfig.value.fieldName }}</div>
        <div>排序顺序：{{ sortFieldConfig.ascend ? "升序" : '降序' }}</div>
        <div>项目编号与名称：{{ filterFieldConfig.inputConfig.value }}</div>
        <div>显示设置：{{ JSON.stringify(displaySettingConfig.value && displaySettingConfig.value.map(item => item.fieldName)) }}</div>
        <YtFilter 
        />
    </div>

</template>

<script>
import { YtFilter } from ".";
import { 
  filterItemList, filterList, filterList2, sortFieldList, 
  statusList, priorityList, categoryPrimaryList,categorySecondaryList,fixedTimeProjectFlagList,
  displaySettingList
} from './mock';
import request from "./request";

export default {
  components: {
    YtFilter,
  },
  data() {
    return {
      menuTabCode: '0',
      filterList: filterList,
      filterFieldConfig: {
          valueField: 'fieldName',
          data: filterItemList,
          selectorConfig: {
            status: {
              type: 'txt',
              data: statusList.map((item) => {
                return {
                  ...item,
                  ...this.getStatusTagColor(item.value),
                }
              }),
              fieldName: 'status',
              placeholder: '全部',
              popperWidth: 200,
              componentType: 'selector',
            },
            projectPriority: {
              type: 'txt',
              data: priorityList.map((item) => {
                return {
                  ...item,
                  prefix: this.getPriorityIcon(item.value),
                }
              }),
              fieldName: 'projectPriority',
              itemType: 'txt',
              placeholder: '全部',
              popperWidth: 158,
              componentType: 'selector',
            }, 
            primaryCategory: {
              type: 'txt',
              data: categoryPrimaryList,
              itemType: 'txt',
              placeholder: '全部',
              fieldName: 'primaryCategory',
              popperWidth: 158,
              componentType: 'selector'
            },
            secondaryCategory: {
              type: 'txt',
              data: categorySecondaryList,
              itemType: 'txt',
              placeholder: '全部',
              popperWidth: 158,
              fieldName: ' secondaryCategory',
              componentType: 'selector'
            },
            fixedTimeProjectFlag: {
              type: 'txt',
              data: fixedTimeProjectFlagList,
              itemType: 'txt',
              placeholder: '全部',
              fieldName: 'fixedTimeProjectFlag',
              popperWidth: 183,
              componentType: 'selector'
            },
            projectManager: {
              type: 'txt',
              data: [],
              itemType: 'txt',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              searchable: true,
              labelField: 'fullName',
              fieldName: 'projectManager',
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector'
            },
            responsibleGroup: {
              type: 'txt',
              data: [],
              itemType: 'txt',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              fieldName: 'responsibleGroup',
              searchable: true,
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector'
            },
            responsibleDepartment: {
              type: 'txt',
              data: [],
              itemType: 'txt',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              searchable: true,
              fieldName: ' responsibleDepartment',
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector'
            },
          },
          inputConfig: {
              label: '',
              fieldName: 'projectNoOrName',
              placeholder: '项目编号或名称',
              value: '',
              componentType: 'input',
          }
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
      displaySettingConfig: {
        value: [],
        data: displaySettingList,
        valueField: 'fieldName',
        colorInfo: {
          activeColor: 'rgb(0, 0, 0, 0.9)',
          activeBgColor: 'rgb(255, 255, 255)',
        },
        showActiveStyle: false
      },
      result: filterList.find((filter => filter.defaultFlag === '1')).filterContent,
      inputValue: '',
    }
  },
  mounted() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  },
  watch: {
    menuTabCode(val) {
      if (val === '0') {
        this.filterList.splice(0, this.filterList.length, ...filterList)
      } else {
        this.filterList.splice(0, this.filterList.length, ...filterList2)
      }
    }
  },
  methods: {
    handleMenuTabClick() {

    },
    handleSave(filter, type, option) { // 保存相关
      if (type === 'reset') {
        console.log('重置', filter, type, option);
      }
      if (type === 'new') {
        console.log('保存新视图', filter, type, option);
      }
      if (type === 'modify') {
        console.log('保存变更', filter, type, option);
      }
      if (type === 'delete') {
        if (filter.defaultFlag === '1') { // 删除默认筛选器
          filterList.find(item => item.id === null).defaultFlag = '1'
        }
        filterList.splice(filterList.findIndex(item => item.id === filter.id), 1)
        console.log('删除筛选器', filter, type, option);
      }
      if (type === 'asDefault') {
        this.filterList.find((filter => filter.defaultFlag === '1')).defaultFlag = '0';
        filter.defaultFlag = '1'
        console.log('设为默认筛选器', filter, type, option);
      }
      if (type === 'rename') {
        filter.name =  `随机一个名字改一个${Date.now()}`
        console.log('重命名筛选器', filter, type, option);
      }
      if (type === 'display-setting') {
        console.log('保存显示设置', this.displaySettingConfig.value);
      }
    },
    handleSelectorDataChange(type, option) {
      if (type === 'remote-search') {
        this.handleSelectorRemoteSearch(option.fieldName, option.keyword);
        return;
      }
      if (type === 'focus') {
        this.handleSelectorFocus(option.fieldName);
        return;
      }
      if (type === 'load-more') {
        this.handleSelectorLoadMore(option.fieldName, option.keyword);
        return;
      }
    },
    handleChange(filter, type, option) { // 修改后列表相关
      if (type === 'modify') {
        this.result = JSON.stringify(
          filter.filterConditionList.filter(
            filterConditionItem => filterConditionItem.componentType !== 'input' && filterConditionItem.fieldName).map((item) => {
              return {
                fieldName: item.fieldName,
                sort: item.sort,
                value: item.fieldName === 'applicationDate' ? [item.value.start, item.value.end] : item.value,
              }
        }));
        this.projectNoOrName = filter.filterConditionList.find(
            filterConditionItem => filterConditionItem.componentType === 'input').value
        console.log('当前筛选器发生更改', filter, type, option, this.result, this.project);
      }
      if (type === 'sort-field') {
        console.log('排序字段改变', filter, type, option);
      }
      if (type === 'order-type') {
        console.log('排序顺序改变', filter, type, option);
      }
    },
    getStatusTagColor(value) {
      if (value === '4') {
        return {
          color: 'rgb(245, 63, 63)',
          bgColor: 'rgb(255, 236, 232)',
        }
      }
      if (value === '6') {
        return {
          color: 'rgb(0, 168, 112)',
          bgColor: 'rgb(232, 248, 242)'
        }
      }
      if (value === '-99') {
        return {
          color: 'rgba(0,0,0,0.90)',
          bgColor: '#f3f3f3'
        }
      }
    },
    getPriorityIcon(value) {
      if (value === '0') {
        return 'https://minio-api.web.guosen.com.cn/lowcode-static/user/defaulttenant/1704339280803_%E4%BD%8E.svg';
      }
      if (value === '1') {
        return 'https://minio-api.web.guosen.com.cn/lowcode-static/user/defaulttenant/1704339287807_%E4%B8%AD.svg';
      }
      if (value === '2') {
        return 'https://minio-api.web.guosen.com.cn/lowcode-static/user/defaulttenant/1704339274041_%E7%B4%A7%E6%80%A5.svg';
      }
    },
    // 获取员工数据
    async getEmployeeData(keyword, page=1, size=20) {
      const res = await request({
        url: "/api/v1/user",
        method: "get",
        params: {
          page,
          size,
          keyword: keyword,
        },
      });
      return res.data;
    },
    async getDepartmentData(keyword, page=1, size=20) {
      const res = await request({
        url: "/api/v1/department",
        method: "get",
        params: {
          supFlag: "0",
          topFlag: "0",
          keyword: keyword,
          size,
          page,
        },
      });
      return res.data;
    },
    handleSelectorFocus(fieldName) {
      const selectorConfig = this.filterFieldConfig.selectorConfig[fieldName];
      if (fieldName === 'projectManager') {
        if (!selectorConfig.data.length && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData().then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptFullName ? `/${item.deptFullName.split('/')[1]}` : ''}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page + 1
            selectorConfig.total = res.total
          });
        }   
      }
      if (fieldName === 'responsibleDepartment' || fieldName === 'responsibleGroup') {
        if (!selectorConfig.data.length && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getDepartmentData().then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.deptNo,
                label: `${item.fullName}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page + 1
            selectorConfig.total = res.total
          });
        }
      }
    },
    handleSelectorLoadMore(fieldName, keyword) {
      const selectorConfig = this.filterFieldConfig.selectorConfig[fieldName];
      if (fieldName === 'projectManager') {
        if (selectorConfig.data.length < selectorConfig.total && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData(keyword, selectorConfig.page).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptFullName ? `/${item.deptFullName.split('/')[1]}` : ''}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page  + 1;
          });
        }   
      }
      if (fieldName === 'responsibleDepartment' || fieldName === 'responsibleGroup') {
        if (selectorConfig.data.length < selectorConfig.total && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getDepartmentData(keyword, selectorConfig.page).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.deptNo,
                label: `${item.fullName}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page + 1
          });
        }
      }
    },
    handleSelectorRemoteSearch(fieldName, keyword) {
      const selectorConfig = this.filterFieldConfig.selectorConfig[fieldName];
      if (fieldName === 'projectManager') {
        if (!selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData(keyword).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptFullName ? `/${item.deptFullName.split('/')[1]}` : ''}`,
              }
            })
            selectorConfig.data.splice(0, selectorConfig.data.length, ...options);
            selectorConfig.loading = false;
            selectorConfig.page = 2;
            selectorConfig.total = res.total;
          });
        }   
      }
      if (fieldName === 'responsibleDepartment' || fieldName === 'responsibleGroup') {
        if (!selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getDepartmentData(keyword).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.deptNo,
                label: `${item.fullName}`,
              }
            })
            selectorConfig.data.splice(0, selectorConfig.data.length, ...options);
            selectorConfig.loading = false;
            selectorConfig.page = 2;
            selectorConfig.total = res.total;
          });
        }
      }
    },
  }
}
</script>
<style>
.yt-filter-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>