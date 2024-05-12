export default {
  variant: {
    type: String,
    default: 'default',
    validator(val) {
      return ['contained', 'filled', 'default', 'separated'].includes(val);
    }
  },
  chevronPosition: {
    type: String,
    default: 'right',
    validator(val) {
      return ['left', 'right'].includes(val);
    }
  },
  defaultValue: {
    type: [String, Array],
    default: null,
    validator(val) {
      if (Array.isArray(val)) {
        return val.every(val => typeof val === 'string');
      }
      return val === null || typeof val === 'string';
    }
  },
  disableChevronRotation: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Array],
    default: null,
    validator(val) {
      if (Array.isArray(val)) {
        return val.every(val => typeof val === 'string');
      }
      return val === null || typeof val === 'string';
    }
  },
  data: {
    type: Array,
    default: () => ([]),
  },
  radius: {
    type: [String, Number],
    default: 'sm',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
}