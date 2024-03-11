export default {
  data: {
    type: Array,
    default: () => ([])
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator(val) {
      return ['horizontal', 'vertical'].includes(val);
    }
  },
  color: {
    type: String,
    default: 'white',
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  withItemsBorders: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'sm',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val);
    }
  },
  radius: {
    type: String | Number,
    default: 'sm',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
}