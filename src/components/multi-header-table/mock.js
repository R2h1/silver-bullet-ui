export const tableData = [
  {
    accountNo: "12374",
    accountName: "李小源",
    memberType: "0",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 9,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 2,
        actualLeaveDays: 2,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 8,
        actualInvestmentDays: 8,
        oldActualLeaveDays: 4,
        actualLeaveDays: 5,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 4,
        oldActualLeaveDays: 8,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 4,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 1,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 1,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 0,
        actualLeaveDays: 4,
      },
    ],
  },
  {
    accountNo: "12375",
    accountName: "张三",
    memberType: "1",
    actualInvestmentDetail: [
      {
        year: "2025",
        month: "05",
        oldActualInvestmentDays: 10,
        actualInvestmentDays: 10,
        oldActualLeaveDays: 3,
        actualLeaveDays: 3,
      },
      {
        year: "2025",
        month: "06",
        oldActualInvestmentDays: 15,
        actualInvestmentDays: 15,
        oldActualLeaveDays: 4,
        actualLeaveDays: 4,
      },
    ],
  },
];

export const tableColumnList = [
  {
    label: "序号",
    field: "number",
    colMinW: 54,
    fixed: true,
  },
  {
    label: "姓名",
    field: "member",
    colMinW: 150,
    fixed: true,
  },
  {
    label: "类型",
    field: "memberTypeName",
    colMinW: 100,
    fixed: true,
  },
  {
    label: "2025年05月工时",
    field: "2025-05",
    colMinW: 240,
    subColumnList: [
      {
        label: "实际投入天数",
        field: "actualInvestmentDays",
        colMinW: 120,
        subColumnList: [
          {
            label: "当前值",
            field: "oldActualInvestmentDays",
            colMinW: 110,
            highlight: (row, column, leafCol) => {
              if (row.totalFlag) return false;
              const key = leafCol.field.replace("old", "");
              const firstLetter = key.charAt(0);
              const otherLetterStr = key.slice(1);
              const oldKey = `old${firstLetter.toUpperCase()}${otherLetterStr}`;
              const newKey = `${firstLetter.toLowerCase()}${otherLetterStr}`;
              return row[column.field][oldKey] !== row[column.field][newKey];
            },
          },
          {
            label: "变更后的值",
            field: "actualInvestmentDays",
            colMinW: 110,
            maxValue: 31,
            required: true,
            columnIndex: 4,
            highlight: (row, column, leafCol) => {
              if (row.totalFlag) return false;
              const key = leafCol.field.replace("old", "");
              const firstLetter = key.charAt(0);
              const otherLetterStr = key.slice(1);
              const oldKey = `old${firstLetter.toUpperCase()}${otherLetterStr}`;
              const newKey = `${firstLetter.toLowerCase()}${otherLetterStr}`;
              return row[column.field][oldKey] !== row[column.field][newKey];
            },
          },
        ],
      },
      {
        label: "请假、调休天数",
        field: "actualLeaveDays",
        colMinW: 134,
        subColumnList: [
          {
            label: "当前值",
            field: "oldActualLeaveDays",
            colMinW: 110,
          },
          {
            label: "变更后的值",
            field: "actualLeaveDays",
            colMinW: 110,
            maxValue: 31,
            required: true,
            columnIndex: 6,
            highlight: (row, column, leafCol) => {
              if (row.totalFlag) return false;
              const key = leafCol.field.replace("old", "");
              const firstLetter = key.charAt(0);
              const otherLetterStr = key.slice(1);
              const oldKey = `old${firstLetter.toUpperCase()}${otherLetterStr}`;
              const newKey = `${firstLetter.toLowerCase()}${otherLetterStr}`;
              return row[column.field][oldKey] !== row[column.field][newKey];
            },
          },
        ],
      },
    ],
  },
  {
    label: "2025年06月工时",
    colMinW: 240,
    field: "2025-06",
    subColumnList: [
      {
        label: "实际投入天数",
        field: "actualInvestmentDays",
        colMinW: 120,
        subColumnList: [
          {
            label: "当前值",
            field: "oldActualInvestmentDays",
            colMinW: 110,
          },
          {
            label: "变更后的值",
            field: "actualInvestmentDays",
            colMinW: 110,
            maxValue: 31,
            required: true,
            columnIndex: 8,
            highlight: (row, column, leafCol) => {
              if (row.totalFlag) return false;
              const key = leafCol.field.replace("old", "");
              const firstLetter = key.charAt(0);
              const otherLetterStr = key.slice(1);
              const oldKey = `old${firstLetter.toUpperCase()}${otherLetterStr}`;
              const newKey = `${firstLetter.toLowerCase()}${otherLetterStr}`;
              return row[column.field][oldKey] !== row[column.field][newKey];
            },
          },
        ],
      },
      {
        label: "请假、调休天数",
        field: "actualLeaveDays",
        colMinW: 134,
        subColumnList: [
          {
            label: "当前值",
            field: "oldActualLeaveDays",
            colMinW: 110,
          },
          {
            label: "变更后的值",
            field: "actualLeaveDays",
            maxValue: 31,
            colMinW: 110,
            required: true,
            columnIndex: 10,
            highlight: (row, column, leafCol) => {
              if (row.totalFlag) return false;
              const key = leafCol.field.replace("old", "");
              const firstLetter = key.charAt(0);
              const otherLetterStr = key.slice(1);
              const oldKey = `old${firstLetter.toUpperCase()}${otherLetterStr}`;
              const newKey = `${firstLetter.toLowerCase()}${otherLetterStr}`;
              return row[column.field][oldKey] !== row[column.field][newKey];
            },
          },
        ],
      },
    ],
  },
];

export const memberTypeList = [
  {
    type: "USER_TYPE",
    desc: "用户类型类型",
    value: "0",
    label: "内部员工",
  },
  {
    type: "USER_TYPE",
    desc: "用户类型类型",
    value: "1",
    label: "人力外包",
  },
  {
    type: "USER_TYPE",
    desc: "用户类型类型",
    value: "3",
    label: "辅助员工",
  },
  {
    type: "USER_TYPE",
    desc: "用户类型类型",
    value: "002-001",
    label: "jira人力外包",
  },
  {
    type: "USER_TYPE",
    desc: "用户类型类型",
    value: "002-002",
    label: "jira项目外包",
  },
];
