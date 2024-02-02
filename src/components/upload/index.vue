<template>
    <YtUploadBus :fileList="fileList" :canDownload="false" showFileList canUpdate>
        <slot name="trigger" slot="trigger"></slot>
    </YtUploadBus>
</template>>

<script>
import { YtUploadBus } from ".";

export default {
    components: {
        YtUploadBus,
    },
    data() {
        return {
            fileList: []
        }
    },
    watch: {
        fileList: {
            handler(val, oldVal) {
                console.log('文件列表更新', console.log(val, oldVal))
            },
            deep: true,
        }
    },
    methods: {
    }
}
</script>