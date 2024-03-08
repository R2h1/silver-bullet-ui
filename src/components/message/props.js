export default {
  type: {
    type: String,
    default: 'success',
    validator: (val) => {
      return ['info', 'success', 'warning', 'error'].includes(val);
    }
  },
  message: {
    type: String,
    default: '消息'
  },
  duration: {
    type: Number,
    default: 3000
  },
  /** 是否可手动关闭 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 消息关闭时触发 */
  onClose: {
    type: Function
  }
}