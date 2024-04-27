export default {
  data: {
    type: Object,
    default: () => ({}),
  },
  stickyHeader: {
    type: Boolean,
    default: false,
  },
  stickyHeaderOffset: {
    type: Number,
    default: 0,
  },
  verticalSpacing: {
    type: [String, Number],
    default: 'xs',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  horizontalSpacing: {
    type: [String, Number],
    default: 'xs',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  captionSide: {
    type: String,
    default: 'bottom',
    validator(val) {
      return ['bottom', 'top'].includes(val);
    }
  },
  striped: {
    type: Boolean,
    default: false,
  },
  highlightOnHover: {
    type: Boolean,
    default: false,
  },
  withTableBorder: {
    type: Boolean,
    default: false,
  },
  withColumnBorders: {
    type: Boolean,
    default: false,
  },
  withRowBorders: {
    type: Boolean,
    default: true,
  }
}