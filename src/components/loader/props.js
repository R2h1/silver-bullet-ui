export default {
  color: {
    type: String,
    default: '#228be6',
  },
  type: {
    type: String,
    default: 'oval',
    validator(val) {
        return ['oval', 'bars', 'dots'].includes(val);
    }
  },
  size: {
    type: String | Number,
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
}