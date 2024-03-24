export default {
  allowNegative: { // 是否允许负值
    type: Boolean,
    default: true,
  },
  decimalScale: { // 限制小数点后显示的位数，默认没有限制
    type: Number,
    validator(val) {
      return val >= 0;
    }
  },
  fixedDecimalScale: { // 小数点后显示的位数显示位数 decimalScale 是否需要使用 0 补全
    type: Boolean,
    default: false,
  },
  thousandSeparator: { // 千位分隔符，默认为空
    type: String,
    default: '',
    validator(val) {
      return [',', ' ', ''].includes(val);
    }
  },
  prefix: { // 在值之前添加前缀
    type: String,
    default: '',
  },
  suffix: { // 在值之后添加后缀
    type: String,
    default: '',
  },
  value: {
    type: String | Number,
  }
}