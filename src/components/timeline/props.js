export default {
  reverse: { // 是否倒叙
    type: Boolean,
    default: false,
  },
  lineWidth: { // 时间轴线宽
    type: Number,
    default: 1,
  },
  orientation: { // 时间轴方向
    type: String,
    default: 'horizontal',
    validator(val) {
      return ['horizontal', 'vertical'].includes(val);
    }
  },
  labelPosition: { // 标签和时间分布位置
    type: String,
    default: 'same',
    validator(val) {
      return ['relative', 'same'].includes(val);
    }
  },
  active: { // active 的节点下标（之前的节点均高亮），默认 -1 表示无高亮节点
    type: Number,
    default: -1,
  },
  nodeSize: { // 节点宽高
    type: Number,
    default: 20
  },
  nodeIcon: { // 节点图标
    type: String,
  },
  nodeRadius: {
    type: [String, Number],
    default: 'xl',
    validator(val) {
      return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val) || typeof val === 'number';
    }
  },
}