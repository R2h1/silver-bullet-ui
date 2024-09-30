export default {
  radius: {
    type: [String, Number],
    default: 0,
    validator(val) {
      return (
        ["xs", "sm", "md", "lg", "xl"].includes(val) ||
        ["number"].includes(typeof val)
      );
    },
  },
  src: {
    type: String,
    default: null
  }
};
