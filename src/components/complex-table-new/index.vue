<template>
  <div class="root">
    <div
      style="width: 100%; flex: 1; min-height: 0px; padding: 50px"
      ref="wrapper"
    >
      <yt-complex-table-new
        ref="complexTable"
        :maxHeight="maxHeight"
        v-if="showTable"
        :tableData="tableData"
        :columnList="tableColumnList"
        @change="handleChange"
      ></yt-complex-table-new>
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
import YtComplexTableNew from "./complex-table-new.vue";
import { tableData, tableColumnList, memberTypeList } from "./mock";

export default {
  components: {
    YtComplexTableNew,
  },
  data() {
    return {
      tableData: [],
      tableColumnList: [],
      maxHeight: undefined,
      showTable: false,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    async handleMounted() {
      await (async () => {
        this.maxHeight = 500;
      })();
    },
    handleSubmit() {
      const res = this.$refs.complexTable.validate(false, false);
      console.error("handleClick2", res);
    },
    handleSave() {
      const res = this.$refs.complexTable.validate(false, true);
      console.error("handleSave", res);
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
      const totalItem = {
        totalFlag: true,
        number: "合计",
      };
      tableData.forEach((item, index) => {
        const { accountName, accountNo, memberType, actualInvestmentDetail } =
          item;
        Object.assign(item, {
          number: index + 1,
          member: `${accountName} ${accountNo}`,
          memberTypeName:
            (
              memberTypeList.find(
                (memberTypeItem) => memberType === memberTypeItem.value
              ) || {}
            ).label || "--",
          editableCellType: {
            actualInvestmentDays: "input",
            actualLeaveDays: "input",
          },
        });
        actualInvestmentDetail.reduce((acc, cur) => {
          const {
            year,
            month,
            actualInvestmentDays,
            actualLeaveDays,
            oldActualInvestmentDays,
            oldActualLeaveDays,
          } = cur;
          acc[`${year}-${month}`] = {
            actualInvestmentDays,
            actualLeaveDays,
            oldActualInvestmentDays,
            oldActualLeaveDays,
            hasValue: index > 0,
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
          return acc;
        }, item);
      });
      console.log(tableData);
      // 添加合计行
      tableData.push(totalItem);
      console.log(totalItem);
      this.tableData = tableData;
      this.tableColumnList = tableColumnList;
      this.showTable = true;
    },
  },
};
</script>
<style lang="scss">
#app,
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
