export default {
  color: {
    type: String,
    default: '#228be6'
  },
  iconSize: {
    type: [String, Number],
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
  radius: {
    type: [String, Number],
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
}