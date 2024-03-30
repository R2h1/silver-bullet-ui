export default {
  color: { // 文本颜色
    type: String,
    default: 'rgba(0, 0, 0, 0.9)',
  },
  variant: {
    type: String,
    validator(val) {
      return ['gradient'].includes(val);
    }
  },
  size: { // 控制字体大小和行高，默认为 md
    type: String | Number,
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  gradient: { // variant 为 gradient 时生效，示例：{ from: 'blue', to: 'indigo', deg: 297 }
    type: Object,
    default: () => ({}),
  },
  inherit: { // 字体属性是否应从父级继承
    type: Boolean,
    default: false
  },
  verticalCenter: { // 将 line-height 设置为 1 以居中
    type: Boolean,
    default: false
  },
  lineClamp: { // 文本保留的行数
    type: Number,
    default: 0,
  },
  inline: { // 是否行内
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: 'left',
    validator(val) {
      return ['left', 'center', 'right'].includes(val);
    }
  },
  decoration: {
    type: String,
    default: 'none',
    validator(val) {
      return ['line-through', 'underline', 'none'].includes(val);
    }
  },
  weight: {
    type: String | Number,
    default: 400,
    validator(val) {
      return ['normal', 'bold'].includes(val) || typeof val === 'number';
    }
  },
  tipPosition: {
    type: String,
    default: 'bottom',
    validator(val) {
      return ['top', 'left', 'right', 'bottom'].includes(val);
    }
  },
  tipText: {
    type: String,
    default: ''
  },
  showTips: {
    type: Boolean,
    default: true,
  }
  
}