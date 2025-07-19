<template>
  <el-table :key="tableKey" :data="tableData" :maxHeight="maxHeight" border ref="complexTable" class="yt-comple-table">
    <dynamic-column v-for="(column) in columnList" @cell-change="handleCellChange" :key="column.field"
      :column="column" />
    <div class="yt-comple-table__empty" slot="empty">
      <img class="loading" v-show="loading"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+Ni5Ob3RpZmljYXRpb27mtojmga/mj5DphpIvNC5Mb2FkaW5n5Yqg6L295LitLzEu5LuF5Zu+5qCH5Yqg6L29LzE2KjE2PC90aXRsZT4KICAgIDxkZWZzPgogICAgICAgIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuLTEiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHBhdHRlcm5Vbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZS0yIj48L3VzZT4KICAgICAgICA8L3BhdHRlcm4+CiAgICAgICAgPGltYWdlIGlkPSJpbWFnZS0yIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBT0NBWUFBQUFmU0MzUkFBQUFBWE5TUjBJQXJzNGM2UUFBQUVSbFdFbG1UVTBBS2dBQUFBZ0FBWWRwQUFRQUFBQUJBQUFBR2dBQUFBQUFBNkFCQUFNQUFBQUJBQUVBQUtBQ0FBUUFBQUFCQUFBQURxQURBQVFBQUFBQkFBQUFEZ0FBQUFDOThEbjZBQUFCcFVsRVFWUW9GVFdTVFhZVU1ReUV5ei9kSWNNcVlaT1hPM0E2THNCTk9CUXZGOGlDRldUSFpLWnQyWHpsTVBQR2JWbFdxVXFTMDlPMytVTkpKVTNWS1cwcGFadFR1NlFkZThlM2M3ZFAvRW5FRU1kZHJUaURTd0ZPbXNwWUdXc1F0TnczSCtkeUE1R3cxSkhWODlURVNieklzOEFEd0hReWZCbTJ3cjZZY0ppMVZCeU5pOFd3d0daTjZpeERiUnRrK1phNmtiZ3NSaHdOZlpZN25JQmcvd3Byc0RKbjEzdEhBdGRyY0RHNGdqNEF1N2JPeDg1WTRLVDcvd3duUUtjYm0wSFl5Ym9QRHNuUU5KUnhYamkvRzh6L0t6ZVBCaEZYY0xpRjdvUGMxUU5XZW91MnZHcDF2UTBWUDltL3R6ZTkvUjVxQ0E0OUUvZmlmSjRMakdRWkNkQ0NaeFFNblFIKzZVVmZ0Z2ZwNmRENVV0VHFxMkovVVB6NnJMbHFISE9CWEdNSGRDWEJHYzJOZlVQZ0tkR2VHam9BdGI5bnhXTlhWQUliUVVFTE93bzhtaXNxR3ZicWFuVHRHTEhSNTZNbzNTSDV2UUtrdmtaUlFhMGRVUE1PVS9jZ0p0OEJaKzNhT3FyY29ZUEpmbUt0bDBNM0Y2T2xEbXdVREpUTUNRT0R5MUZVS0tjR3lUelU2d1dnUWJBRXpRbllQMVlCNkhlRDV0bDRjbFY1QzVWdUxTQ1JxMzhscU9MRy9tR3gvZ0FBQUFCSlJVNUVya0pnZ2c9PSI+PC9pbWFnZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSI2Lk5vdGlmaWNhdGlvbua2iOaBr+aPkOmGki80LkxvYWRpbmfliqDovb3kuK0vMS7ku4Xlm77moIfliqDovb0vMTYqMTYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgIDxwYXRoIGQ9Ik04LDEuNSBDMTEuNTg5ODUwOSwxLjUgMTQuNSw0LjQxMDE0OTEzIDE0LjUsOCBDMTQuNSwxMS41ODk4NTA5IDExLjU4OTg1MDksMTQuNSA4LDE0LjUgQzQuNDEwMTQ5MTMsMTQuNSAxLjUsMTEuNTg5ODUwOSAxLjUsOCBDMS41LDQuNDEwMTQ5MTMgNC40MTAxNDkxMywxLjUgOCwxLjUgWiBNOCwzLjUgQzUuNTE0NzE4NjMsMy41IDMuNSw1LjUxNDcxODYzIDMuNSw4IEMzLjUsMTAuNDg1MjgxNCA1LjUxNDcxODYzLDEyLjUgOCwxMi41IEMxMC40ODUyODE0LDEyLjUgMTIuNSwxMC40ODUyODE0IDEyLjUsOCBDMTIuNSw1LjUxNDcxODYzIDEwLjQ4NTI4MTQsMy41IDgsMy41IFoiIGlkPSJPdmFsIiBmaWxsPSJ1cmwoI3BhdHRlcm4tMSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" />
      <div class="empty" v-show="loaded">
        <img class="img" width="160" height="120" src="./empty.png" />
        <div class="label">暂无数据</div>
      </div>
    </div>
  </el-table>
</template>

<script>
import { Table as ElTable } from 'element-ui';
import DynamicColumn from './yt-dynamic-column.vue';

export default {
  name: 'yt-comple-table',
  components: {
    ElTable,
    DynamicColumn,
  },
  props: {
    tableData: {
      type: Array,
      default: () => ([]),
    },
    columnList: {
      type: Array,
      default: () => ([]),
    },
    loading: { // 正在加载中...
      type: Boolean,
      default: false,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      tableKey: 1,
    };
  },

  watch: {
    columnList(newVal) {
      this.tableKey = this.tableKey + 1;
    },
  },
  methods: {
    handleCellChange(event) {
      this.$emit('cell-change', event);
    },
    handleChange(value) {
      // 行数据 + 列字段信息
      this.$emit('change', {
        row: value.row,
        columnField: value.columnField,
        subColField: value.subColField,
      });
    },
    hanldeCellBlur(row, column, subCol) {
      let value = row[column.field][subCol.field];
      let errorMsg = '';
      const numValue = Number(value);
      // 验证范围
      if (value === '' || value == null) {
        errorMsg = '不能为空'
      } else if (numValue < 0 || Number.isNaN(numValue)) {
        errorMsg = '只能是非负数值'
      } else if (numValue > subCol.maxValue) {
        errorMsg = `不能超过${subCol.maxValue}`;
      } else {
        value = numValue;
      }
      row[column.field][subCol.field] = value;
      if (!row[column.field].validResult) {
        this.$set(row[column.field], 'validResult', {})
      }
      if (subCol.field) {
        this.$set(row[column.field].validResult, `${subCol.field}`, {
          valid: false,
          msg: '',
        })
      }
      row[column.field].validResult[subCol.field].valid = !Boolean(errorMsg);
      row[column.field].validResult[subCol.field].msg = errorMsg;
      // 行数据 + 列字段信息
      this.$emit('change', {
        row,
        columnField: column.field,
        subColField: subCol.field,
      });
    },
    handleCellInput(row, column, subCol) {
      let value = row[column.field][subCol.field];
      const reg = new RegExp(`^\\d+(?:\\.\\d{0,${2}})?`);
      if (reg.test(value)) {
        value = value.match(new RegExp(`^\\d+(?:\\.\\d{0,${2}})?`))[0];
      }
      row[column.field][subCol.field] = value;
      if (!row[column.field].validResult) {
        this.$set(row[column.field], 'validResult', {})
      }
      if (subCol.field) {
        this.$set(row[column.field].validResult, `${subCol.field}`, {
          valid: false,
          msg: '',
        })
      }
      row[column.field].validResult[subCol.field].valid = true;
      row[column.field].validResult[subCol.field].msg = ''
    },
    validateCell(row, column, subCol, canEmpty) {
      const columnField = column.field;
      const subColField = subCol.field;
      const value = row[columnField][subColField];
      let errorMsg = '';
      let valid = true;
      const numValue = Number(value);
      // 验证范围
      if (value === '' || value == null) {
        errorMsg = '不能为空'
        valid = canEmpty;
      } else if (Number.isNaN(numValue) || numValue < 0) {
        errorMsg = '只能是非负数值';
        valid = false;
      } else if (numValue > subCol.maxValue) {
        errorMsg = `不能超过${subCol.maxValue}`;
        valid = false;
      }
      if (!row[columnField].validResult) {
        this.$set(row[columnField], 'validResult', {})
      }
      if (subColField) {
        this.$set(row[columnField].validResult, `${subColField}`, {
          valid: false,
          msg: '',
        })
      }
      row[columnField].validResult[subColField].valid = valid;
      row[columnField].validResult[subColField].msg = errorMsg;
      return {
        valid,
      }
    },
    validate(hasFocus, canEmpty) {
      const result = {
        valid: true,
      }
      let isFocus = hasFocus;
      let refName = '';
      this.tableData.filter(item => !item.totalFlag).forEach((row) => {
        this.columnList.forEach(column => {
          if (column.subColumnList) {
            column.subColumnList.forEach((subCol) => {
              if (row.editableCellType && row.editableCellType[subCol.field] === 'input') {
                refName = `${row.number}_${column.field}_${subCol.field}`;
                const validateResult = this.validateCell(row, column, subCol, canEmpty);
                if (validateResult && !validateResult.valid) {
                  if (!isFocus) {
                    const el = this.$refs[refName]?.[0]?.$el;
                    el?.scrollIntoView({ block: "center", behavior: "smooth" });
                    isFocus = true;
                  }
                  result.valid = false;
                }
              }
            })
          }
        })
      })
      return result;
    }
  }
}

</script>
<style lang="scss">
.yt-comple-table {
  &.el-table {
    width: 100%;
    font: 14px / 22px PingFangSC-Regular;
    color: rgba(0, 0, 0, 0.9);
    transition: opacity 2s;

    .el-table__cell {
      padding: 0;
    }

    .el-table__header-wrapper {

      .el-table__cell {
        padding: 12px;
        color: rgba(0, 0, 0, 0.60);
        background: #F3F3F3;

        .cell {
          padding: 0;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          line-height: 22px;
          white-space: nowrap;
        }

        .required-mark {
          color: #F53F3F;
          line-height: 22px;
        }
      }
    }

    .el-table__body-wrapper .el-table__cell .cell {
      padding: 12px;
      line-height: 22px;

      .el-input__inner {
        padding: 0 8px;
      }

      .error .el-input__inner {
        border-color: #f24957;
      }

      .error-msg {
        color: #f24957;
        font-size: 12px;
        position: absolute;
        bottom: -2px;
        left: 12px;
        line-height: 16px;
      }
    }

    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #C5C5C5;
      }
    }

    &::before,
    &::after {
      width: 0;
      height: 0;
    }

    .yt-comple-table__empty {
      .loading {
        position: absolute;
        top: 45%;
        left: 45%;
        transform: translateY(-50%);
        width: 32.5px;
        height: 32.5px;
        animation: rotate 1s linear infinite;
      }

      .empty {
        position: absolute;
        top: 45%;
        left: 45%;
        transform: translateY(-50%);
        line-height: 1;
      }

      .label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.60);
      }
    }
  }
}
</style>