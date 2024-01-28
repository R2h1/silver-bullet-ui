<template>
    <YtUploadBus :fileList="fileList" :canDownload="false" showFileList canUpdate>
        <slot name="trigger" slot="trigger"></slot>
    </YtUploadBus>
</template>>

<script>
import { YtUploadBus, YtButton } from "@yutu/yt-vue";

export default {
    components: {
        YtUploadBus,
        YtButton
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