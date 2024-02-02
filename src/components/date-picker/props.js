export default {
    label: {
        type: String,
        default: ''
    },
    showLabel: {
        type: Boolean,
        default: false,
    },
    dateWidth: {
        type: Number,
        default: 78,
    },
    placeholderWidth: {
        type: Number,
        default: 56,
    },
    startField: {
        type: String,
        default: 'start',
    },
    endField: {
        type: String,
        default: 'end',
    },
    value: {
        type: Object,
        default: () => ({ start: '', end: '' })
    },
    startPlaceholder: {
        type: String,
        default: '开始日期'
    },
    endPlaceholder: {
        type: String,
        default: '结束日期'
    },
    editable: {
        type: Boolean,
        default: false,
    },
    clearable: {
        type: Boolean,
        default: false,
    },
    valueFormat: {
        type: String,
        default: 'yyyy-MM-dd'
    },
    separator: {
        type: String,
        default: '至'
    },
    appendToBody: {
        type: Boolean,
        default: true,
    },
    isInputFitContent: {
        type: Boolean,
        default: true
    },
    showSuffixIcon: {
        type: Boolean,
        default: true
    },
    showPrefixIcon: {
        type: Boolean,
        default: false,
    },
    popperClass: {
        type: String,
        default: ''
    },
}