export default {
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 400
},
  loaderProps: {
    type: Object,
    default: () => ({})
  },
  overlayProps: {
    type: Object,
    default: () => ({})
  }
}