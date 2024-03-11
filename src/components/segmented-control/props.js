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
  fullWidth: {
    type: Boolean,
    default: false
  },
  withItemsBorders: {
    type: Boolean,
    default: true,
  },
}