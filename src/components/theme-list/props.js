export default {
  data: {
    type: Array,
    default: () => ([])
  },
  value: {
    type: Object,
    default: () => ({}),
  },
  colorInfo: {
    type: Object,
    default: () => ({})
  },
  valueField: {
    type: String,
    default: 'value'
  },
  once: { // active 是否只触发一次
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  }
}