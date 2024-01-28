export default { 
    label: {
        type: String,
        default: '',
    },
    limit: {
        type: Number,
        default: 0,
    },
    customClass: {
        type: String,
        default: "",
    },
    extraData: {
        type: Object,
        default: () => {
            return {
                // useScene: "0",
            };
        },
    },
    drag: {
        type: Boolean,
        default: false,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
    headers: {
        type: Object,
        default: () => {
            return {
                // Authorization:
                // "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNjE5MiIsImFjY291bnRObyI6IjA2MTkyIiwiZXhwIjoxNzA1NDEwNTM1LCJpYXQiOjE3MDUzNjczMzUsImp0aSI6IjIxYWI0ZTg0LTE2MDctNGM4Yy05M2YwLTQ0MGMzNzkwYTUxMyJ9.2rqQBfgv0_n23eUChNfXvMYfTqqvAB2ItgBKa_qwmxE",
            };
        },
    },
    action: {
        type: String,
        // default: "/api/v1/file",
        // default: "/gw/pjmgApi/api/v1/file",
    },
    // 文件列表
    fileList: {
        type: Array,
        default: () => {
            return [];
        },
    },
    showFileList: {
        type: Boolean,
        default: true,
    },
    // 是否在选取文件之后立即上传
    autoUpload: {
        type: Boolean,
        default: true,
    },
    canDownload: {
        type: Boolean,
        default: true,
    },
    canUpload: {
        type: Boolean,
        default: true,
    },
    canUpdate: {
        type: Boolean,
        default: true,
    },
    canDelete: {
        type: Boolean,
        default: true,
    },
    showCreateName: {
        type: Boolean,
        default: true,
    },
    showCreateTime: {
        type: Boolean,
        default: true,
    },
    iconSize: {
        type: Number,
        default: 16,
    }
}