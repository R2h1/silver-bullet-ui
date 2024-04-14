export default {
  color: {
    type: String,
    default: '#228be6',
  },
  labelColor: {
    type: String,
    default: '#ffffff',
  },
  trackColor: {
    type: String,
    default: '#e9ecef',
  },
  radius: {
    type: [String, Number],
    default: 'md',
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
  value: {
    type: Number,
  },
  striped: {
    type: Boolean,
    default: false
  },
  animated: { // 条纹是否应该动画，默认为 false，如果设置，则忽略 striped 属性，
    type: Boolean,
    default: false,
  },
}