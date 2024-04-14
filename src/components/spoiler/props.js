export default {
  maxHeight: {
    type: Number,
    default: 100,
  },
  value: { // 是否展示
    type: Boolean,
    default: false
  },
  showLabel: {
    type: String,
    default: '',
  },
  hideLabel: {
    type: String,
    default: ''
  },
  once: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: 'center',
    validator(val) {
      return ['left', 'center', 'right'].includes(val)
    }
  },
  transitionDuration: {
    type: Number,
    default: 200
  },
  maskHeight: {
    type: Number,
    default: 25,
  }
}