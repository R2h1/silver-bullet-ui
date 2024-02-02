export default {
    sortValueField: { // 排序字段列表值字段
        type: String,
        default: 'fieldName',
    },
    idSuffix: {
        type: String,
        default: '0',
    },
    filterItemValueField: { // 筛选字段列表值字段
        type: String,
        default: 'fieldName',
    },
    filterList: { // 筛选器列表
        type: Array,
        default: () => ([])
    },
    sortFieldConfig: { // 排序字段配置
        type: Object,
        default: () => ({})
    },
    filterFieldConfig: { // 筛选字段配置
        type: Object,
        default: () => ({})
    }
}