export default {
  order: {
    type: Number,
    default: 1,
    validator(val) {
      return [1, 2, 3, 4, 5, 6].includes(val);
    }
  },
  textWrap: {
    type: String,
    default: 'wrap',
    validator(val) {
      return ['wrap', 'nowrap', 'balance', 'pretty', 'stable'].includes(val);
    }
  },
  lineClamp: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
  }
}