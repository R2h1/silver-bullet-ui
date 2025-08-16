<template>
  <div class="root">
    <div
      style="width: 100%; flex: 1; min-height: 0px; padding: 50px"
      ref="wrapper"
    >
      <yt-complex-table
        ref="complexTable"
        :loading="tableLoading"
        :loaded="tableLoaded"
        :maxHeight="maxHeight"
        :tableData="tableData"
        :columnList="tableColumnList"
        @change="handleChange"
        @action="handleAction"
      ></yt-complex-table>
    </div>
    <div
      style="
        width: 100%;
        height: 60px;
        position: fixed;
        display: flex;
        align-items: center;
        bottom: 0px;
        left: 0px;
        z-index: 1000;
        padding: 0 60px;
        background-color: #fff;
        box-shadow: inset 1px 1px rgba(0, 0, 0, 0.1);
      "
    >
      <el-button @click="handleSubmit">提交</el-button>
      <el-button @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import YtComplexTable from "./index";
import { tableData, tableColumnList, memberTypeList } from "./mock";
export default {
  components: {
    YtComplexTable,
  },
  data() {
    return {
      tableData: [],
      tableColumnList: [],
      tableLoading: false,
      tableLoaded: false,
      listPageInfo: {
        current: 1,
        total: 0,
        size: 10,
        refreshing: false,
      },
      maxHeight: undefined,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleAction(action, row) {
      console.log(action, row);
    },
    handleSubmit() {
      const res = this.$refs.complexTable.validate(false, false);
      console.error("handleClick2", res);
    },
    handleSave() {
      const res = this.$refs.complexTable.validate(false, true);
      console.error("handleSave", res);
    },
    async handleMounted() {
      await (async () => {
        this.maxHeight = this.$refs.wrapper.clientHeight;
      })();
    },
    handleClick() {
      const res = this.$refs.complexTable.validate(false, false);
      console.error("handleClick2", res);
    },
    handleChange(value) {
      console.error("handleChange", value);
    },
    async getTableData() {
      function divide(num) {
        const numStr = String(num || "");
        const parts = numStr.split(".");
        const integer = parts[0];
        const decimal = numStr.replace(integer, "");
        return [integer, parts[1] ? decimal : ""];
      }

      function plus(num1, num2) {
        const [integer1, decimal1] = divide(num1);
        const [integer2, decimal2] = divide(num2);
        let integer = String(BigInt(integer1) + BigInt(integer2));
        let decimal = "";
        if (decimal1 && decimal2) {
          decimal = String((decimal1 * 100 + decimal2 * 100) / 100);
        } else if (decimal1) {
          decimal = decimal1;
        } else if (decimal2) {
          decimal = decimal2;
        }
        const curry = BigInt(Math.floor(decimal));
        decimal = String(decimal).split(".")[1];
        integer = BigInt(integer) + curry;
        return `${integer}${decimal ? `.${decimal}` : ""}`;
      }
      this.tableLoading = true;
      this.tableLoaded = false;
      const totalItem = {
        totalFlag: true,
        number: "合计",
      };
      tableData.forEach((item, index) => {
        const {
          investRadio,
          accountName,
          accountNo,
          memberType,
          actualInvestmentDetail,
        } = item;
        Object.assign(item, {
          // 唯一标识
          rowId: index,
          number: index + 1,
          member: `${accountName} ${accountNo}`,
          memberTypeName:
            (
              memberTypeList.find(
                (memberTypeItem) => memberType === memberTypeItem.value
              ) || {}
            ).label || "--",
          investRadio,
          editableCellType: {
            actualInvestmentDays: "input",
            actualInvestment: "input",
            actualLeaveDays: memberType === "0" ? "input" : "text",
          },
        });
        actualInvestmentDetail.reduce((acc, cur) => {
          const {
            year,
            month,
            actualInvestmentDays,
            actualInvestment,
            actualLeaveDays,
            actualOtherDays,
          } = cur;
          acc[`${year}-${month}`] = {
            actualInvestmentDays,
            actualInvestment,
            actualLeaveDays,
            actualOtherDays,
          };
          if (!totalItem[`${year}-${month}`]) {
            totalItem[`${year}-${month}`] = {
              actualInvestmentDays: 0,
              actualInvestment: 0,
            };
          }
          totalItem[`${year}-${month}`].actualInvestmentDays = Number(
            plus(
              totalItem[`${year}-${month}`].actualInvestmentDays,
              actualInvestmentDays
            )
          );
          totalItem[`${year}-${month}`].actualInvestment = Number(
            plus(
              totalItem[`${year}-${month}`].actualInvestment,
              actualInvestment
            )
          );
          return acc;
        }, item);
      });
      // 添加合计行
      tableData.push(totalItem);
      console.log(totalItem);
      this.tableData = tableData;
      this.tableColumnList = tableColumnList;
      this.tableLoading = true;
      this.tableLoaded = false;
    },
  },
};
</script>
<style lang="scss">
.root {
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
}

html,
body {
  height: 100%;
}

body {
  overflow-y: hidden;
}
</style>
