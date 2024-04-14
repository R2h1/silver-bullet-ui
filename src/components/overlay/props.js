export default {
    backgroundOpacity: {
        type: Number,
        default: 0.6,
        validator(val) {
            return  val >= 0 && val <= 1;
        },
    },
    color: {
        type: String,
        default: '#000',
    },
    fixed: {
        type: Boolean,
        default: false,
    },
    gradient: {
        type: String,
    },
    zIndex: {
        type: Number,
        default: 200
    },
    blur: {
        type: [String, Number],
        default: 0
    },
    radius: {
        type: [String, Number],
        default: 0
    },
    opacity: {
        type: Number,
        validator(val) {
            return  val >= 0 && val <= 1;
        }
    }
}