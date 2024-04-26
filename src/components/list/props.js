export default {
  type: {
    type: String,
    default: "unordered",
    validator(val) {
      return ["ordered", "unordered"].includes(val);
    }
  },
  withPadding: {
    type: Boolean,
    default: false,
  },
  size: { // 控制字体大小和行高，默认为 md
    type: String,
    default: 'md',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val);
    }
  },
  center: {
    type: Boolean,
    default: false,
  }
}