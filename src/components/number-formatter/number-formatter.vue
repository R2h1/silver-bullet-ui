<template>
  <span :class="`${prefixClass}`" >{{formattedValue}}</span>
</template>

<script>
import props from './props.js';

export default {
  name: 'sb-number-formatter',
  props: { 
    ...props 
  },
  data() {
    return {
      prefixClass: 'sb-number-formatter',
    }
  },
  computed: {
    formattedValue() {
      let valueStr = String(this.value);
      // 去除多余的小数点
      let splitValueGroup = valueStr.split('.');
      if (splitValueGroup.length > 2) {
        valueStr = `${splitValueGroup[0]}.${splitValueGroup.slice(1).join('')}`;
        splitValueGroup = valueStr.split('.');
      }
      const valueIsNumericStr = this.isNumeric(valueStr);
      // 非数字字符串(包括空字符串)直接返回前后缀
      if (!valueIsNumericStr) {
        return `${this.prefix}${this.suffix}`;
      }
      // 不允许负数
      if (!this.allowNegative && valueStr[0] === '-') {
        return `${this.prefix}${this.suffix}`;
      }
      // 首个小数点前面部分则为整数部分，后面为小数部分
      let value = this.splitNumString(splitValueGroup[0], { 
          every: 3,
          divide: this.thousandSeparator
      }); // 整数部分
      if (splitValueGroup.length === 2) { // valueStr 有小数点
        let decimal = splitValueGroup[1].substring(0, this.decimalScale); // 小数部分
        if (this.fixedDecimalScale) { // 需要用 0 填充到指定的 this.decimalScale
          decimal = decimal.padEnd(this.decimalScale, '0');
        }
        value = `${value}.${decimal}`;
      }
      return `${this.prefix}${value}${this.suffix}`;
    }
  },
  methods: {
    isNumeric(value) { // 判断一个值是否为数字或者数字字符串，排除 NaN
      return ['string', 'number'].includes(typeof value) && value !== '' && !Number.isNaN(Number(value));
    },
    splitNumString(numString, options = {}) { // 不支持有小数点
      const { every = 3, divide = ',' } = options;
      // RegExp需要加反斜杠转义反斜杠
      // (?=\B(\\d{${every}})+$) 前瞻断言在后面是"非单词边界的 every 个数字结尾出现一次或多次"匹配空字符
      const reg = new RegExp(`(?=\\B(\\d{${every}})+$)`, 'g');
      return numString.replace(reg, divide);
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
