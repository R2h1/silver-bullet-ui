export default {
  value: {
  },
  optionsLabel: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  showSelected: {
    type: Boolean,
    default: true,
  },
  showSelectedLimit: {
    type: Number,
    default: 0,
  },
  data: {
    type: Array,
    default: () => ([]),
  },
  loading: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: '',
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  labelField: {
    type: String,
    default: 'label',
  },
  filterable: {
    type: Boolean,
    default: false
  },
  reserveKeyword: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  collapseTags: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'tag',
    validator(val) {
      return ['tag', 'txt'].includes(val);
    }
  },
  searchable: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Boolean,
    default: false,
  },
  showSelectedList: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
    validator(val) {
      return ['medium', 'small', 'mini'].includes(val);
    }
  },
  autoWidth: {
    type: Boolean,
    default: false
  },
  popperAutoWidth: {
    type: Boolean,
    default: true,
  },
  popperWidth: {
    type: Number,
    default: 300,
  },
  popperClass: {
    type: String,
    default: '',
  },
  itemType: {
    type: String,
    default: 'tag',
    validator(val) {
      return ['tag', 'txt'].includes(val);
    }
  },
  selectedLabel: {
    type: String,
    default: '已选',
  },
  showSelectedCount: {
    type: Boolean,
    default: true,
  },
  showRemoveAllIcon: {
    type: Boolean,
    default: false,
  },
  unSelectText: {
    type: String,
    default: '',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  selectedList: {
    type: Array,
    default: () => ([])
  },
  selectedValueSet: {
    type: Set,
    default: () => (new Set())
  }
}