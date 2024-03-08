<template>
    <YtUploadBus 
    :action="action" 
    :headers="headers" 
    :extraData="extraData" 
    @success="handleSuccess" ref="uploadBus" label="附件" :fileList="fileList" :canDownload="false" showFileList canUpdate
    @delete="handleDelete"
    @update="handleUpdate"
    @error="handleError"
    >
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
            fileList: [],
            extraData: {
                useScene: "0",
            },
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwNjE5MiIsImFjY291bnRObyI6IjA2MTkyIiwiZXhwIjoxNzA4NjkxNTE3LCJpYXQiOjE3MDg2NDgzMTcsImp0aSI6IjdkZTM0YjMxLWJlNWYtNDkyNS1hODBiLTU3YzM4MzY1OTZjMyJ9.mCKPyQ2eFzjYEHnz8O5i1azTQ3xz_nz_k7CcSbHaenI",
            },
            action: "/api/v1/file",
            oldFile: null,
            isUpdateFile: false,
            changeIndex: -1,
        }
    },
    mounted() {
        setTimeout(() => {
            const fileInfoList = [
                {
    "id": "633316958377218048",
    "fileName": "yutu_lcap_vue-0.1.40",
    "fileExt": "tgz",
    "fileFullName": "yutu_lcap_vue-0.1.40.tgz",
    "createId": "06192",
    "createName": "潘栋华",
    "createTime": "2024-02-21 10:52:05"
}
]
    const temp = [];
    fileInfoList.forEach((item) => {
        let file = {};
        file.data = item;
        file.name = item.fileFullName;
        file.uid = item.id;
        temp.push(file);
    })
    this.fileList.splice(0, this.fileList.length, ...temp);
    console.log(this.fileList)
        }, 2000)
    },
    watch: {
        fileList: {
            handler(val, oldVal) {
                // console.log('文件列表更新', console.log(val, oldVal))
            },
            deep: true,
        }
    },
    methods: {
        handleSuccess(event) {
            const { file, response } = event
            const uploadedFile = file;
            let fileId;
            if (response.code === 0 && response.data) {
                fileId = response.data[0]
            }
            console.log('已经成功', file.response, file)
            fetch('/api/v1/file/' + fileId).then(response => {
                return response.json()
            }).then(res=> {
                this.$set(file, 'data', res.data)
            })
        },
        handleDelete(event) {
            this.fileList.splice(event.index, 1)
        },
        handleUpdate(event) {
            const { index, newFile, oldFile } = event;
            this.oldFile = oldFile;
            this.isUpdateFile = true;
            this.changeIndex = index;
            this.fileList.splice(index, 1, newFile)
        },
        handleError(event) {
            if (this.isUpdateFile) {
                this.fileList.splice(this.changeIndex, 1, this.oldFile);
                this.isUpdateFile = false;
            } else {
                this.fileList.pop();
            }
        }
    }
}
</script>