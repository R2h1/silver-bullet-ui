export default {
  highlight: {
    type: [String, Array],
    required: true,
  },
  highlightStyles: {
    type: Object,
    default: () => ({}) 
  },
  bgColor: {
    type: String,
    default: '#ffec99'
  },
  color: {
    type: String,
    default: 'rgb(0, 0, 0)'
  },
}