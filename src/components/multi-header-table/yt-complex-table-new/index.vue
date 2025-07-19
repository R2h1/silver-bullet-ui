<template>
  <el-table
    :key="tableKey"
    :data="tableData"
    :maxHeight="maxHeight"
    border
    ref="complexTable"
    class="yt-comple-table-new"
  >
    <template v-for="column in columnList">
      <!-- 多级表头 -->
      <el-table-column
        v-if="column.subColumnList"
        :key="column.field"
        :prop="column.field"
        :fixed="column.fixed"
        :min-width="column.colMinW || 150"
      >
        <template slot="header">
          <span>
            {{ column.label }}
          </span>
          <span class="required-mark" v-if="column.required">*</span>
        </template>
        <el-table-column
          v-for="subCol in column.subColumnList"
          :key="subCol.field"
          :label="subCol.label"
          :prop="subCol.field"
          :fixed="subCol.fixed"
          :min-width="subCol.colMinW || 150"
        >
          <template slot="header">
            <span>
              {{ subCol.label }}
            </span>
            <span class="required-mark" v-if="subCol.required">*</span>
          </template>
          <el-table-column
            v-for="leafCol in subCol.subColumnList"
            :key="leafCol.field"
            :label="leafCol.label"
            :prop="leafCol.field"
            :fixed="leafCol.fixed"
            :min-width="leafCol.colMinW || 150"
          >
            <template slot="header">
              <span>
                {{ leafCol.label }}
              </span>
              <span class="required-mark" v-if="leafCol.required">*</span>
            </template>
            <template slot-scope="scope">
              <template
                v-if="
                  scope.row.editableCellType &&
                  scope.row.editableCellType[leafCol.field] === 'input'
                "
              >
                <div class="cell-wrapper">
                  <el-input
                    :ref="`${scope.row.number}_${column.field}_${[
                      leafCol.field,
                    ]}`"
                    v-model="scope.row[column.field][leafCol.field]"
                    @input="() => handleCellInput(scope.row, column, leafCol)"
                    placeholder="请输入"
                    @blur="() => hanldeCellBlur(scope.row, column, leafCol)"
                    size="mini"
                    :class="{
                      error:
                        scope.row[column.field].validResult &&
                        scope.row[column.field].validResult[leafCol.field] &&
                        scope.row[column.field].validResult[leafCol.field].msg,
                    }"
                  />
                  <span
                    v-if="
                      scope.row[column.field].validResult &&
                      scope.row[column.field].validResult[leafCol.field] &&
                      scope.row[column.field].validResult[leafCol.field].msg
                    "
                    class="error-msg"
                    >{{
                      scope.row[column.field].validResult[leafCol.field].msg
                    }}</span
                  >
                </div>
              </template>
              <div
                v-else
                :class="{
                  'cell-wrapper': true,
                  highlight:
                    leafCol.highlight &&
                    leafCol.highlight(scope.row, column, leafCol),
                }"
              >
                <span class="text">
                  {{ scope.row[column.field][leafCol.field] }}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <!-- 普通列 -->
      <el-table-column
        v-else
        :key="`${column.field}_leaf`"
        :prop="column.field"
        :label="column.label"
        :fixed="column.fixed"
        :min-width="column.colMinW || 150"
      >
        <template slot="header">
          <span>{{ column.label }}</span>
          <span class="required-mark" v-if="column.required">*</span>
        </template>
        <template slot-scope="scope">
          <div class="cell-wrapper">
            <span class="text">
              {{ scope.row[column.field] }}
            </span>
          </div>
        </template>
      </el-table-column>
    </template>
    <div class="yt-comple-table__empty" slot="empty">
      <img
        class="loading"
        v-show="loading"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+Ni5Ob3RpZmljYXRpb27mtojmga/mj5DphpIvNC5Mb2FkaW5n5Yqg6L295LitLzEu5LuF5Zu+5qCH5Yqg6L29LzE2KjE2PC90aXRsZT4KICAgIDxkZWZzPgogICAgICAgIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuLTEiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHBhdHRlcm5Vbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZS0yIj48L3VzZT4KICAgICAgICA8L3BhdHRlcm4+CiAgICAgICAgPGltYWdlIGlkPSJpbWFnZS0yIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBT0NBWUFBQUFmU0MzUkFBQUFBWE5TUjBJQXJzNGM2UUFBQUVSbFdFbG1UVTBBS2dBQUFBZ0FBWWRwQUFRQUFBQUJBQUFBR2dBQUFBQUFBNkFCQUFNQUFBQUJBQUVBQUtBQ0FBUUFBQUFCQUFBQURxQURBQVFBQUFBQkFBQUFEZ0FBQUFDOThEbjZBQUFCcFVsRVFWUW9GVFdTVFhZVU1ReUV5ei9kSWNNcVlaT1hPM0E2THNCTk9CUXZGOGlDRldUSFpLWnQyWHpsTVBQR2JWbFdxVXFTMDlPMytVTkpKVTNWS1cwcGFadFR1NlFkZThlM2M3ZFAvRW5FRU1kZHJUaURTd0ZPbXNwWUdXc1F0TnczSCtkeUE1R3cxSkhWODlURVNieklzOEFEd0hReWZCbTJ3cjZZY0ppMVZCeU5pOFd3d0daTjZpeERiUnRrK1phNmtiZ3NSaHdOZlpZN25JQmcvd3Byc0RKbjEzdEhBdGRyY0RHNGdqNEF1N2JPeDg1WTRLVDcvd3duUUtjYm0wSFl5Ym9QRHNuUU5KUnhYamkvRzh6L0t6ZVBCaEZYY0xpRjdvUGMxUU5XZW91MnZHcDF2UTBWUDltL3R6ZTkvUjVxQ0E0OUUvZmlmSjRMakdRWkNkQ0NaeFFNblFIKzZVVmZ0Z2ZwNmRENVV0VHFxMkovVVB6NnJMbHFISE9CWEdNSGRDWEJHYzJOZlVQZ0tkR2VHam9BdGI5bnhXTlhWQUliUVVFTE93bzhtaXNxR3ZicWFuVHRHTEhSNTZNbzNTSDV2UUtrdmtaUlFhMGRVUE1PVS9jZ0p0OEJaKzNhT3FyY29ZUEpmbUt0bDBNM0Y2T2xEbXdVREpUTUNRT0R5MUZVS0tjR3lUelU2d1dnUWJBRXpRbllQMVlCNkhlRDV0bDRjbFY1QzVWdUxTQ1JxMzhscU9MRy9tR3gvZ0FBQUFCSlJVNUVya0pnZ2c9PSI+PC9pbWFnZT4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSI2Lk5vdGlmaWNhdGlvbua2iOaBr+aPkOmGki80LkxvYWRpbmfliqDovb3kuK0vMS7ku4Xlm77moIfliqDovb0vMTYqMTYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIG9wYWNpdHk9IjAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0PgogICAgICAgIDxwYXRoIGQ9Ik04LDEuNSBDMTEuNTg5ODUwOSwxLjUgMTQuNSw0LjQxMDE0OTEzIDE0LjUsOCBDMTQuNSwxMS41ODk4NTA5IDExLjU4OTg1MDksMTQuNSA4LDE0LjUgQzQuNDEwMTQ5MTMsMTQuNSAxLjUsMTEuNTg5ODUwOSAxLjUsOCBDMS41LDQuNDEwMTQ5MTMgNC40MTAxNDkxMywxLjUgOCwxLjUgWiBNOCwzLjUgQzUuNTE0NzE4NjMsMy41IDMuNSw1LjUxNDcxODYzIDMuNSw4IEMzLjUsMTAuNDg1MjgxNCA1LjUxNDcxODYzLDEyLjUgOCwxMi41IEMxMC40ODUyODE0LDEyLjUgMTIuNSwxMC40ODUyODE0IDEyLjUsOCBDMTIuNSw1LjUxNDcxODYzIDEwLjQ4NTI4MTQsMy41IDgsMy41IFoiIGlkPSJPdmFsIiBmaWxsPSJ1cmwoI3BhdHRlcm4tMSkiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4="
      />
      <div class="empty" v-show="loaded">
        <img class="img" width="160" height="120" src="./empty.png" />
        <div class="label">暂无数据</div>
      </div>
    </div>
  </el-table>
</template>

<script>
import {
  Table as ElTable,
  TableColumn as ElTableColumn,
  Input as ElInput,
} from "element-ui";

export default {
  name: "yt-comple-table-new",
  components: {
    ElTable,
    ElTableColumn,
    ElInput,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columnList: {
      type: Array,
      default: () => [],
    },
    loading: {
      // 正在加载中...
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
    hanldeCellBlur(row, column, subCol) {
      let value = row[column.field][subCol.field];
      const numValue = Number(value);
      // 验证范围
      if (value !== "" && value != null) {
        value = numValue;
      }
      row[column.field][subCol.field] = value;
      // 行数据 + 列字段信息
      this.$emit("change", {
        row,
        columnField: column.field,
        subColField: subCol.field,
      });
    },
    handleCellInput(row, column, subCol) {
      const columnField = column.field;
      const subColField = subCol.field;
      let value = row[columnField][subColField];
      let errorMsg = "";
      const res = value.match(new RegExp(`^\\d+(?:\\.\\d{0,2})?`));
      if (!res) {
        if (value !== "" && value != null) {
          errorMsg = "只能输入非负数值";
          value = null;
        } else {
          errorMsg = "不能为空";
        }
      } else {
        const splitRes = res[0].split(".");
        const integer = Number(splitRes[0]); // 去除前面的 0
        const int = String(integer);
        const decimal = splitRes[1];
        const intStr = int.substring(0, 13); // 最大只能 13 位
        if (splitRes.length === 1) {
          // 没有小数点
          value = intStr;
        } else {
          value = `${intStr}.${decimal}`;
        }

        const numValue = Number(value);
        if (numValue > subCol.maxValue) {
          errorMsg = `不能超过${subCol.maxValue}`;
        }
      }
      row[columnField][subColField] = value;
      if (!row[columnField].validResult) {
        this.$set(row[columnField], "validResult", {});
      }
      if (!row[columnField].validResult[subColField]) {
        this.$set(row[columnField].validResult, `${subColField}`, {
          valid: false,
          msg: "",
        });
      }
      row[columnField].validResult[subColField].valid = !errorMsg;
      row[columnField].validResult[subColField].msg = errorMsg;
    },
    validateCell(row, column, subCol, canEmpty) {
      const columnField = column.field;
      const subColField = subCol.field;
      const value = row[columnField][subColField];
      let errorMsg = "";
      let valid = true;
      const numValue = Number(value);
      // 验证范围
      if (value === "" || value == null) {
        errorMsg = "不能为空";
        valid = canEmpty;
      } else if (Number.isNaN(numValue) || numValue < 0) {
        errorMsg = "只能输入非负数值";
        valid = false;
      } else if (numValue > subCol.maxValue) {
        errorMsg = `不能超过${subCol.maxValue}`;
        valid = false;
      }
      if (!row[columnField].validResult) {
        this.$set(row[columnField], "validResult", {});
      }
      if (!row[columnField].validResult[subColField]) {
        this.$set(row[columnField].validResult, `${subColField}`, {
          valid: false,
          msg: "",
        });
      }
      row[columnField].validResult[subColField].valid = valid;
      row[columnField].validResult[subColField].msg = errorMsg;
      return {
        valid,
      };
    },
    validate(hasFocus, canEmpty) {
      const result = {
        valid: true,
      };
      let isFocus = hasFocus;
      let refName = "";
      this.tableData
        .filter((item) => !item.totalFlag)
        .forEach((row) => {
          this.columnList.forEach((column, x) => {
            (column.subColumnList || []).forEach((subCol, y) => {
              (subCol.subColumnList || []).forEach((leafCol, z) => {
                if (row.editableCellType?.[leafCol.field] === "input") {
                  refName = `${row.number}_${column.field}_${leafCol.field}`;
                  const validateResult = this.validateCell(
                    row,
                    column,
                    leafCol,
                    canEmpty
                  );
                  if (validateResult && !validateResult.valid) {
                    if (!isFocus) {
                      const el = this.$refs[refName]?.[0]?.$el;
                      this.scrollToCell(row, leafCol);
                      isFocus = true;
                    }
                    result.valid = false;
                  }
                }
              });
            });
          });
        });
      return result;
    },
    tableScrollToColumn(bodyWrapper, columnIndex, fixedNum = 0) {
      const theTableRow = bodyWrapper.querySelector(
        ".el-table__body tbody .el-table__row"
      );
      let scrollLeft = 0;
      for (let i = fixedNum; i < theTableRow.children.length; i++) {
        if (i == columnIndex) {
          break;
        }
        scrollLeft += theTableRow.children[i].offsetWidth;
      }
      bodyWrapper.scrollLeft = scrollLeft;
    },
    tableScrollToRow(bodyWrapper, rowIndex) {
      const theTableRows = bodyWrapper.querySelectorAll(
        ".el-table__body tbody .el-table__row"
      );
      let scrollTop = 0;
      for (let i = 0; i < theTableRows.length; i++) {
        if (i === rowIndex) {
          break;
        }
        scrollTop += theTableRows[i].offsetHeight;
      }
      bodyWrapper.scrollTop = scrollTop;
    },
    scrollToCell(row, leafCol) {
      const tableRef = this.$refs.complexTable;
      const bodyWrapper = tableRef.bodyWrapper;
      const fixedNum = tableRef.columns.findIndex((column) => !column.fixed);
      const columnIndex = leafCol.columnIndex;
      const rowIndex = row.number - 1;
      this.tableScrollToColumn(bodyWrapper, columnIndex, fixedNum);
      this.tableScrollToRow(bodyWrapper, rowIndex);
    },
  },
};
</script>
<style lang="scss">
.yt-comple-table-new {
  &.el-table {
    width: 100%;
    font: 14px / 22px PingFangSC-Regular;
    color: rgba(0, 0, 0, 0.9);
    transition: opacity 2s;

    .el-table__cell {
      padding: 0;
    }

    .el-table__fixed {
      height: 100%;
    }

    .el-table__header-wrapper,
    .el-table__fixed-header-wrapper {
      .el-table__cell {
        padding: 12px;
        color: rgba(0, 0, 0, 0.6);
        background: #f3f3f3;

        .cell {
          padding: 0;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
          line-height: 22px;
          white-space: nowrap;
        }

        .required-mark {
          color: #f53f3f;
          line-height: 22px;
        }
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      .el-table__cell .cell {
        padding: 0px;
        .cell-wrapper {
          width: 100%;
          padding: 12px;
          display: inline-flex;
          align-items: center;
          height: 52px;
          &.highlight {
            background-color: rgb(223, 199, 179);
            .text {
              color: #fff;
            }
          }
          .text {
            line-height: 22px;
          }

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
      }
    }

    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #c5c5c5;
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
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
