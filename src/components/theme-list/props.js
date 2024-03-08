export default {
  data: {
    type: Array,
    default: () => ([])
  },
  value: {
    type: [Object, Array],
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
  canDraggable: {
    type: Boolean,
    default: false,
  },
  multiple: { // 可多选
    type: Boolean,
    default: false,
  }
}