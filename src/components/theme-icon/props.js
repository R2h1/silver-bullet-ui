export default {
  variant: {
    type: String,
    default: 'filled',
    validator(val) {
      return ['gradient', 'filled', 'light', 'outline', 'default', 'white'].includes(val);
    }
  },
  radius: {
    type: [String, Number],
    default: 'sm',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  size: {
    type: [String, Number],
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  color: { // 图标主题色
    type: String,
    default: '#228be6'
  },
  gradient: { // variant 为 gradient 时生效，示例：{ from: 'blue', to: 'indigo', deg: 297 }
    type: Object,
    default: () => ({}),
  },
}