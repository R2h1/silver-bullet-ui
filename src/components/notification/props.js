export default {
    title: {
        type: String,
    },
    duration: {
        type: Number,
        default: 3000
    },
    type: {
        type: String,
        default: 'info',
        validator: (val) => {
            return ["info", "success", "warning", "error"].includes(val);
        }
    },
    content: {
        type: String,
    },
    footer: {
        type: String,
    },
    /** 是否展示图标 */
    showIcon: {
        type: Boolean,
        default: false,
    },
    /** 是否可手动关闭 */
    closeable: {
        type: Boolean,
        default: false,
    },
    styles: {
        type: Object,
    }
}