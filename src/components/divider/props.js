export default {
  color: {
    type: String,
    default: '#dee2e6'
  },
  labelPosition: {
    type: String,
    default: 'center',
    validator(val) {
      return ['center', 'left', 'right'].includes(val);
    }
  },
  my: {
    type: Number,
  },
  size: {
    type: Number | String,
    default: 'xs',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  variant: {
    type: String,
    default: 'solid',
    validator(val) {
      return ['solid', 'dashed', 'dotted'].includes(val);
    }
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator(val) {
      return ['horizontal', 'vertical'].includes(val);
    }
  },
}