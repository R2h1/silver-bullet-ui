export default {
  src: {
    type: String,
    default: null,
  },
  size: {
    type: [String, Number],
    default: "md",
    validator(val) {
      return (
        ["xs", "sm", "md", "lg", "xl"].includes(val) || typeof val === "number"
      );
    },
  },
  variant: {
    type: String,
    default: "light",
    validator(val) {
      return [
        "gradient",
        "filled",
        "light",
        "outline",
        "transparent",
        "default",
        "white",
      ].includes(val);
    },
  },
  gradient: {
    // variant 为 gradient 时生效，示例：{ from: 'blue', to: 'indigo', deg: 297 }
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
  },
  alt: {
    type: String,
    default: "",
  },
  color: {
    type: [String, "initials"],
    default: "gray",
  },
  radius: {
    type: [String, Number],
    default: "sm",
    validator(val) {
      return (
        ["xs", "sm", "md", "lg", "xl"].includes(val) || typeof val === "number"
      );
    },
  },
};
