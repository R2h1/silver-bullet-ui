<template>
  <div ref="root" :class="[`${prefixClass}`, {
      'is-full-width': fullWidth,
    }]" >
    <el-popover
      ref="select-popper"
      :popper-class="`${prefixClass}__select-popper`"
      :style="`--amount-select-popper-width: ${popperWidth}px;`"
      placement="bottom-start"
      :append-to-body="false"
      :visible-arrow="false"
      @hide="clearInputs"
      v-model="popperVisible.amountSelect"
    >
    <div ref="trigger" :class="`${prefixClass}__trigger`" slot="reference">
        <span :class="`${prefixClass}__trigger--wrap`">
          <span v-if="showLabel" :class="`${prefixClass}__trigger-prefix`">{{ label }}</span>
          <span :class="`${prefixClass}__trigger--select-text`">{{ selectedText }}</span>
        </span>
        <suffix-icon :class="`${prefixClass}__trigger-suffix`"/>
    </div>
    <div :class="`${prefixClass}__select-popper--header`">
      <div :class="`${prefixClass}__select-popper--title`">{{ label.replace('：', '') }}</div>
      <div v-show="showClearBtn" :class="`${prefixClass}__clear-area`">
        <div :class="`${prefixClass}__clear-area--divider`"></div>
        <div :class="`${prefixClass}__clear-area--btn`" @click="handleClear">清空</div>
      </div>
    </div>
    <el-popover
      :popper-class="`${prefixClass}__operator-select-popper`"
      placement="bottom-start"
      :append-to-body="false"
      :visible-arrow="false"
      v-model="popperVisible.operatorSelect"
    >
      <div :class="`${prefixClass}__operator-select-trigger`" slot="reference">
          <span :class="`${prefixClass}__operator-select-trigger--select-text`">{{ operatorConfig.value.label }}</span>
          <chevron-down-icon :class="`${prefixClass}__operator-select-trigger--suffix`"/>
      </div>
      <theme-list 
        v-model="operatorConfig.value" 
        :data="operatorConfig.data"
        :once="false"
        @click-item="popperVisible.operatorSelect = false;"
        @change="clearInputs" >
          <template #default="{ current }"  >
              {{ current.label }}
          </template>
        </theme-list>
    </el-popover>
    <div :class="`${prefixClass}__input-area`">
      <div v-if="operatorConfig.value.value === 'range'" :class="`${prefixClass}__input-area--start`">
        <el-input
          clearable
          :class="`${prefixClass}__input`"
          placeholder="请输入" 
          v-model="inputValue.start"
          @input="(value) => handleInputChange(value)"
        />
        <span :class="`${prefixClass}__divider`">~</span>
      </div>
      <div :class="`${prefixClass}__input-area--end`">
        <el-input 
          clearable
          :class="`${prefixClass}__input`"
          placeholder="请输入"
          v-model="inputValue.end"
          @input="(value) => handleInputChange(value, 'end')"
        />
        <span :class="`${prefixClass}__unit`">万元</span>
      </div>
      
    </div>
    <div v-show="errorText" :class="`${prefixClass}__error`">{{ errorText  }}</div>
    <div :class="`${prefixClass}__operate-area`">
      <el-button :disabled="isDisabledConfirm" :class="`${prefixClass}__operate-area--confirm`" @click="handleConfirm" >确认</el-button>
      <el-button :class="`${prefixClass}__operate-area--cancel`" @click="handleCancel" >取消</el-button>
    </div>
    </el-popover>
  </div>
  
</template>

<script>

import { 
    Popover as ElPopover,
    Input as ElInput,
    Button as ElButton
} from 'element-ui';
import ThemeList from '../filter/theme-list.vue';
import { 
    SuffixIcon,
    ChevronDownIcon
} from '../icons';


const operatorList = [
  {
    value: 'range',
    label: '选择范围',
  },
  {
    value: 'exceed',
    label: '大于等于',
  },
  {
    value: 'less',
    label: '小于等于',
  },
  {
    value: 'equal',
    label: '等于',
  },
]

export default {
  name: 'yt-amount-select',
  components: {
    ElPopover,
    ElInput,
    ElButton,
    ThemeList,
    SuffixIcon,
    ChevronDownIcon
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    label: {
      type: String,
      default: '项目预算：'
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
      default: () => ({ start: '', end: '' })
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    popperWidth: {
      type: Number,
      default: 400,
    },
    bgColor: {
      type: String,
    },
    digit: {
      type: Number,
      default: 4,
      validator(val) {
        return val >= 0;
      }
    }
  },
  data() {
    return {
      prefixClass: 'yt-amount-select',
      operatorConfig: {
        value: operatorList[0],
        data: operatorList
      },
      inputValue: {
        start: '',
        end: '',
      },
      popperVisible: {
        operatorSelect: false,
        amountSelect: false
      },
    }
  },
  computed: {
    selectedText() {
      if (this.value.start === '' && this.value.end === '') { // 两个都为空，展示全部
        return '全部';
      }
      if (this.value.start !== '' && this.value.end !== '') {
        if (this.value.start === this.value.end) return '等于' + this.value.end + '万元';
        return this.value.start + '至' + this.value.end + '万元 之间';
      } 
      if (this.value.start === '') {
        return '小于等于' + this.value.end + '万元';
      }
      if (this.value.end === '') {
        return '大于等于' + this.value.start + '万元';
      }
      return '全部';
    },
    showClearBtn() {
      if (this.value.start === '' && this.value.end === '') { // 两个都为空，展示全部
        return false;
      }
      return true;
    },
    isDisabledConfirm() { 
      // 前提是 handleInputChange 已对输入值做处理为字符串：this.inputValue 里的值只可能是有效的数字字符串或者空字符串
      const operator = this.operatorConfig.value.value;
      // 1. 范围选择时，都有值且起始值小于等于结束值时，才允许确认
      if (operator === 'range') { 
        return !(Boolean(this.inputValue.start)
          && Boolean(this.inputValue.end)
          && Number(this.inputValue.start) <= Number(this.inputValue.end))
      }
      // 2. 大于等于、小于等于、等于时，有值才允许确认
      return !this.inputValue.end;
    },
    errorText() {
      // 前提是 handleInputChange 已对输入值做处理为字符串：this.inputValue 里的值只可能是有效的数字字符串或者空字符串
      const operator = this.operatorConfig.value.value;
      if (operator === 'range') { 
        // 范围选择时，都有值，且起始值大于结束值，提示：'起始金额不得大于结束金额'
        if (this.inputValue.start
          && this.inputValue.end
          && Number(this.inputValue.start) > Number(this.inputValue.end)) {
            return '起始金额不能大于结束金额';
        }
      }
      return '';
    }
  },
  mounted() {
    this.bgColor && this.$refs.trigger.style.setProperty('--amount-select-trigger-bg', this.bgColor);
    window.addEventListener('click', this.popperVisibleHandler, true);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.popperVisibleHandler, true);
  },
  methods: {
    clearInputs() {
      this.inputValue.start = '';
      this.inputValue.end = '';
    },
    handleConfirm() { // Number() 对 1. 或 1.00 保留整数
      this.popperVisible.amountSelect = false;
      const operator = this.operatorConfig.value.value;
      if (operator === 'range') {
        this.value.start = Number(this.inputValue.start);
        this.value.end =  Number(this.inputValue.end);
      } else if (operator === 'equal') {
        this.value.start = Number(this.inputValue.end);
        this.value.end = Number(this.inputValue.end);
      } else if (operator === 'exceed') {
        this.value.start = Number(this.inputValue.end);
        this.value.end = '';
      } else if (operator === 'less') {
        this.value.start = '';
        this.value.end = Number(this.inputValue.end);
      }
      this.$emit('change', this.value);
    },
    handleCancel() {
      this.popperVisible.amountSelect = false;
      this.clearInputs();
    },
    handleClear() {
      this.value.start = '';
      this.value.end = '';
      this.$emit('change', this.value)
    },
    handleInputChange(value, key='start') {
      const res = value.match(new RegExp(`^\\d+(?:\\.\\d{0,${parseInt(this.digit)}})?`));
      if (!res) {
        this.inputValue[key] = '';
      } else {
        const splitRes = res[0].split('.');
        const integer = Number(splitRes[0]); // 去除前面的 0
        if (splitRes.length === 1) { // 没有小数点
          this.inputValue[key] = String(integer);
        } else {
          this.inputValue[key] = `${integer}.${splitRes[1]}`;
        }
      }
    },
    popperVisibleHandler(event) {
      const root = this.$refs.root;
      if (root && !this.$refs.root.contains(event.target)) {
        this.popperVisible.amountSelect = false;
      }
      const operatorSelectPopper = root.querySelector(`.${this.prefixClass}__operator-select-popper`);
      const operatorSelectTrigger = root.querySelector(`.${this.prefixClass}__operator-select-trigger`);
      if (operatorSelectPopper 
        && !operatorSelectPopper.contains(event.target)
        && operatorSelectTrigger !== event.target) {
        this.popperVisible.operatorSelect = false;
      }
    },
  }
}
</script>

<style lang="scss">
@import "./amount-select.scss"
</style>