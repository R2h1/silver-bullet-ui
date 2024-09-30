export default {
  inline: {
    type: Boolean,
    default: false
  },
  maw: {
    type: Number, 
  },
  h: {
    type: Number,
  },
  p: {
    type: [String, Number],
    default: 0,
    validator(val) {
      return ["xs", "sm", "md", "lg", "xl"].includes(val) || typeof val === "number"
    },
  }
}