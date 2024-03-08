export default {
  vertical: {
    type:  Boolean,
    default: false
  },
  align: { // 交叉轴对齐方式，对应 align-items，默认撑满（stretch）
    type: String,
  },
  justify: {
    type: String,
    default: 'flex-start',
  },
  wrap: {
    type: Boolean,
    default: false,
  },
  space: {
    type: [Number, Array],
  },
}