<template>
  <div class="wrapper">
    <div style="width: 64px; height: 100%"> </div>
    <div class="yt-filter-list">
    <el-tabs v-model="menuTabCode" @tab-click="handleTabChange">
      <el-tab-pane label="我的待办" name="0"></el-tab-pane>
      <el-tab-pane label="我的已办" name="1"></el-tab-pane>
    </el-tabs>
    <YtFilter 
      ref="filter"
      :filterList="filterList"
      @change="handleChange"
      :filterFieldConfig="newFilterFieldConfig"
      @selector-data-change="handleSelectorDataChange"
      :sortFieldConfig="newSortFieldConfig"
      :scene="`project_list_${menuTabCode}`"
      @export="handleExport"
      :exportConfig="exportConfig"
      :displaySettingConfig="newDisplaySettingConfig"
      @save="handleSave"
      @display-setting="handleDisplaySettingChange"
        />
      <div>当前的 filterContent：{{ result }}</div>
    <div>排序字段：{{ sortFieldConfig.value.label }} - {{ sortFieldConfig.value.fieldName }}</div>
    <div>排序顺序：{{ sortFieldConfig.ascend ? "升序" : '降序' }}</div>
    <div>项目编号与名称：{{ filterFieldConfig.inputConfig.value }}</div>
    <div>显示设置：{{ JSON.stringify(displaySettingConfig.value && displaySettingConfig.value.map(item => item.fieldName)) }}</div>
    <div>显示设置：{{ JSON.stringify(displaySettingConfig.data.map(item => ({ sort: item.sort, label: item.label}))) }}</div>
</div>
  </div>
    

</template>

<script>
import { YtFilter } from ".";
import { 
  filterItemList, newFilterList2, sortFieldList, saveTestFilterList,saveTestFilterList2,
  statusList, priorityList, categoryPrimaryList,categorySecondaryList,fixedTimeProjectFlagList,
  displaySettingList,
  newFilterList,
  processTypeList,
  nodeTypeList
} from './mock';
import request from "./request";

export default {
  components: {
    YtFilter,
  },
  data() {
    return {
      menuTabCode: '0',
      filterList: [],
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
              searchable: true,
              searchPlaceholder: '输入状态'
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
              fieldName: 'secondaryCategory',
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
              selectorType: 'person',
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
              componentType: 'selector',
              searchPlaceholder: '请输入姓名、工号搜索'
            },
            responsibleGroup: {
              type: 'txt',
              data: [],
              itemType: 'txt',
              selectorType: 'department',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              fieldName: 'responsibleGroup',
              searchable: true,
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector',
              showOptionsByTree: true,
              treeData: [],
              searchPlaceholder: '请输入部门名称'
            },
            responsibleDepartment: {
              type: 'txt',
              data: [],
              itemType: 'txt',
              selectorType: 'department',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              searchable: true,
              fieldName: 'responsibleDepartment',
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector',
              showOptionsByTree: true,
              treeData: [],
              searchPlaceholder: '请输入部门名称'
            },
            createId: {
              type: 'txt',
              data: [],
              selectorType: 'person',
              itemType: 'txt',
              placeholder: '全部',
              showSelectedList: true,
              popperWidth: 320,
              optionsLabel: '搜索结果',
              searchable: true,
              labelField: 'fullName',
              fieldName: 'createId',
              loading: false,
              remote: true,
              page: 1,
              componentType: 'selector',
              searchPlaceholder: '请输入姓名、工号搜索'
            },
            workflowName: {
              type: 'txt',
              data: processTypeList,
              itemType: 'txt',
              placeholder: '全部',
              fieldName: 'workflowName',
              popperWidth: 158,
              componentType: 'selector'
            },
            nodeType: {
              type: 'txt',
              data: nodeTypeList,
              itemType: 'txt',
              placeholder: '全部',
              fieldName: 'nodeType',
              popperWidth: 158,
              componentType: 'selector'
            },
            applicationDate: {
              fieldName: 'applicationDate',
              label: '申请时间：',
              value: { start: '', end: '' }, 
              componentType: 'date-picker'
            },
            createTime: {
              fieldName: 'createTime',
              label: '发起时间：',
              value: { start: '', end: '' }, 
              componentType: 'date-picker'
            },
            receiveTime: {
              fieldName: 'receiveTime',
              label: '接收时间：',
              value: { start: '', end: '' }, 
              componentType: 'date-picker'
            }
          },
          inputConfig: {
              label: '',
              fieldName: 'projectNoOrName',
              placeholder: '项目编号或名称',
              value: '',
              componentType: 'input',
          },
          
      },
      count: 0,
      sortFieldConfig: {
          ascend: false,
          label: '按',
          value: {
              label: '项目编号',
              fieldName: 'projectNo',
          },
          data: sortFieldList.filter(item => !['fixedTimeProjectFlag', 'projectPriority'].includes(item.fieldName)),
          valueField: 'fieldName',
      },
      displaySettingConfig: {
        value: displaySettingList.filter(item => item.fixedFlag === '0' && item.hiddenFlag === '0'),
        cannotHiddenColumnList: displaySettingList.filter(item => item.fixedFlag === '1'),
        data: displaySettingList.filter(item => item.fixedFlag === '0'),
        colorInfo: {
          activeColor: 'rgb(0, 0, 0, 0.9)',
          activeBgColor: 'rgb(255, 255, 255)',
        },
        valueField: 'fieldName',
        showActiveStyle: false
      },
      exportConfig: {
        label: '下载',
        disabled: false,
        loading: false,
      },
      newFilterFieldConfig: {},
      newSortFieldConfig: {},
      newDisplaySettingConfig: {},
      result: newFilterList.find((filter => filter.defaultFlag === '1')).filterContent,
      inputValue: '',
    }
  },
  mounted() {
    setTimeout(() => {
      this.filterList = newFilterList.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
      this.newFilterFieldConfig = this.filterFieldConfig;
      this.newSortFieldConfig= this.sortFieldConfig;
      this.newDisplaySettingConfig = this.displaySettingConfig;
    }, 500)
  },
  watch: {
    menuTabCode(val) {
      if (val === '0') {
        setTimeout(() => {
          if (this.count === 1) {
            this.filterList = saveTestFilterList.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
          } else {
            this.filterList = newFilterList.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
          }
    }, 100)

      } else {
        setTimeout(() => {
          this.filterList = newFilterList2.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
    }, 100)
      }
    },
  },
  methods: {
    handleDisplaySettingChange({ filter, type, value }) {
      if (type === 'toggle') {
        value.hiddenFlag = value.hiddenFlag === '1' ? '0' : '1';
        console.log('切换显示设置', value, this.displaySettingConfig.value);
      }
      if (type === 'sort') {
        console.log('排序显示设置', value);
      }
    },
    handleSave({ filter, type, defaultFilter }) { // 保存相关
      if (type === 'reset') {
        console.log('重置', filter, type);
      }
      if (type === 'create') {
        if (this.count === 0) {
          this.filterList = saveTestFilterList.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
          this.count = this.count + 1;
        } else {
          this.filterList = saveTestFilterList2.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag));
        }
        console.log('保存新视图', filter, type);
      }
      if (type === 'modify') {
        filter.isModify = false;
        filter.filterContent = this.result
        console.log('保存变更', filter, type);
      }
      if (type === 'remove') {
        if (filter.defaultFlag === '1') { // 删除默认筛选器
          this.filterList.find(item => item.id === null).defaultFlag = '1'
        }
        this.filterList.splice(this.filterList.findIndex(item => item.id === filter.id), 1)
        console.log('删除筛选器', filter, type, defaultFilter === filter);
      }
      if (type === 'asDefault') {
        this.filterList.find((filter => filter.defaultFlag === '1')).defaultFlag = '0';
        filter.defaultFlag = '1'
        this.filterList = this.filterList.sort((a, b) => Number(b.defaultFlag) - Number(a.defaultFlag))
        console.log('设为默认筛选器', filter, type, defaultFilter);
      }
      if (type === 'rename') {
        filter.name =  `随机一个名字改一个很长的${Date.now()}`
        console.log('重命名筛选器', filter, type);
      }
      if (type === 'display') {
        console.log('保存显示设置', this.displaySettingConfig.value);
      }
    },
    handleSelectorDataChange({ type, fieldName, keyword, data, node}) {
      if (type === 'remote-search') {
        this.handleSelectorRemoteSearch(fieldName, keyword);
        return;
      }
      if (type === 'focus') {
        this.handleSelectorFocus(fieldName);
        return;
      }
      if (type === 'load-more') {
        this.handleSelectorLoadMore(fieldName, keyword);
        return;
      }
      if (type === 'load-node') {
        this.handleLoadNode(data, node)
      }
    },
    handleChange({ filter, type }) { // 修改后列表相关
      if (type === 'modify') {
        const filterContent = filter.filterConditionList.filter(
            filterConditionItem => filterConditionItem.componentType !== 'input' && filterConditionItem.fieldName).map((item) => {
              return {
                fieldName: item.fieldName,
                sort: item.sort,
                value: item.componentType === 'date-picker' ? [item.value.start, item.value.end] : item.selectedList,
              }
        })
        this.result = JSON.stringify(filterContent);
        
        let result = {}
        const selectorConfigMap = this.filterFieldConfig.selectorConfig;
        const datePickerFieldNames = Object.values(selectorConfigMap)
            .filter(item => item.componentType === 'date-picker')
            .map(item => item.fieldName);
        const validFilterConditionList = filter.filterConditionList.filter(
          filterConditionItem => filterConditionItem.componentType !== 'input' && filterConditionItem.fieldName);
        validFilterConditionList.forEach((condition) => {
          
          if (datePickerFieldNames.includes(condition.fieldName)) {
            const key = condition.fieldName.charAt(0).toUpperCase()
  + condition.fieldName.slice(1);
            result['start' + key] = condition.value.start;
            result['end' + key] = condition.value.end;
          } else {
            result[condition.fieldName] = condition.value.join(',');
          }
        })
        // console.log('当前筛选器发生更改', filter, type, filterContent, this.filterFieldConfig.inputConfig.value);
      }
      if (type === 'sort-field') {
        console.log('排序字段改变', filter, type);
      }
      if (type === 'order-type') {
        console.log('排序顺序改变', filter, type);
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
        return '';
      }
      if (value === '1') {
        return '';
      }
      if (value === '2') {
        return '';
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
    async getDepartmentData(keyword, parentNo, page = 1, size=20) {
      const params = {
        supFlag: "0",
        topFlag: "1",
        size: -1,
      };
      if (parentNo) {
        params.parentNo = parentNo;
        params.topFlag = '0';
      }
      if (keyword) { // 搜索
        params.topFlag = '0';
        params.page = page;
        params.size = size;
        params.keyword = keyword;
      }
      const res = await request({
        url: "/api/v1/department",
        method: "get",
        params,
      });
      return res.data;
    },
    handleSelectorFocus(fieldName) {
      const selectorConfig = this.filterFieldConfig.selectorConfig[fieldName];
      if (selectorConfig.selectorType === 'person') {
        if (!selectorConfig.data.length && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData().then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptName ? `/${item.deptName}` : ''}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page + 1
            selectorConfig.total = res.total
          });
        }   
      }
      if (selectorConfig.selectorType === 'department') {
        if (!selectorConfig.treeData.length && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getDepartmentData('', '', null).then((res) => {
            if (res.records && res.records.length) {
              const item = res.records[0];
              const parent = {
                ...item,
                value: item.deptNo,
                label: item.name,
                leaf: false,
                children: [],
              };
              selectorConfig.treeData.splice(0, selectorConfig.treeData.length, parent);
              return this.getDepartmentData('', parent.deptNo);
            }
          }).then((res) => {
            if (res.records && res.records.length) {
              const children = res.records.map((child) => {
                return {
                  ...child,
                  value: child.deptNo,
                  label: child.name,
                  leaf: false,
                  children: [],
                }
              });
              selectorConfig.treeData[0].children.push(...children);
            }
          }).finally(() => {
            selectorConfig.loading = false;
          });
        }
      }
    },
    handleSelectorLoadMore(fieldName, keyword) {
      const selectorConfig = this.filterFieldConfig.selectorConfig[fieldName];
      if (selectorConfig.selectorType === 'person') {
        if (selectorConfig.data.length < selectorConfig.total && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData(keyword, selectorConfig.page).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptName ? `/${item.deptName}` : ''}`,
              }
            })
            selectorConfig.data.push(...options);
            selectorConfig.loading = false;
            selectorConfig.page = selectorConfig.page  + 1;
          });
        }   
      }
      if (selectorConfig.selectorType === 'department') {
        console.error('selectorConfig.page', selectorConfig.page)
        if (selectorConfig.data.length < selectorConfig.total && !selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getDepartmentData(keyword, undefined, selectorConfig.page).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.deptNo,
                label: `${item.name}`,
                subLabel: item.fullName.split('/').join('-')
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
      if (selectorConfig.selectorType === 'person') {
        if (!selectorConfig.loading) {
          selectorConfig.loading = true;
          this.getEmployeeData(keyword).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.accountNo,
                label: `${item.fullName}/${item.accountNo}${item.deptName ? `/${item.deptName}` : ''}`,
              }
            })
            selectorConfig.data.splice(0, selectorConfig.data.length, ...options);
            selectorConfig.loading = false;
            selectorConfig.page = 2;
            selectorConfig.total = res.total;
          });
        }   
      }
      if (selectorConfig.selectorType === 'department') {
        if (!selectorConfig.loading && keyword) {
          selectorConfig.loading = true;
          this.getDepartmentData(keyword).then((res) => {
            const options = res.records.map((item) => {
              return {
                ...item,
                value: item.deptNo,
                label: `${item.name}`,
                subLabel: item.fullName.split('/').join('-')
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
    handleExport() {
      this.exportConfig.loading = true;
      setTimeout(() => {
        this.exportConfig.loading = false;
      }, 3000)
    },
    handleLoadNode(data, node) {
      if (!node.loading) {
        node.loading = true
        this.getDepartmentData('', data.deptNo).then((res) => {
          if (res.records) {
            if (res.records.length) {
              const children = res.records.map((child) => {
                return {
                  ...child,
                  value: child.deptNo,
                  label: child.name,
                  leaf: false,
                  children: [],
                }
              });
              data.children.splice(0, data.children.length, ...children);
            } else { // 叶子节点
              node.isLeaf = true
              data.leaf = true
            }
          }
        }).finally(() => {
          node.loading = false;
        });
      }
    },
    async task(num = 1) {
      await new Promise((resolve) => {
        const list = [];
        for (let i = 1; i < 100000 * num; i++) {
          list.push(i);
        }
        resolve();
      });
    },
    async handleTabChange() {
      console.time('11111');
      await this.task(100)
await this.task(100)
await this.task(100)
      console.timeEnd('11111');
    }
  }
}
</script>
<style>
.wrapper {
  display: flex;
}
.yt-filter-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>