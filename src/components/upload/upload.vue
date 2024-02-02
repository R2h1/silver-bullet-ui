<template>
  <div :class="`${prefixClass}`">
    <div :class="`${prefixClass}__triggers`">
      <el-upload
        v-if="canUpload"
        :class="[customClass, `${prefixClass}__upload-op`]"
        :action="action"
        :headers="headers"
        :data="extraData"
        :on-remove="handleRemove"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError"
        :multiple="multiple"
        :before-upload="handleBefore"
        :limit="limit"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :show-file-list="false"
        :auto-upload="autoUpload"
        :drag="drag"
        :on-change="handleChange"
      >
        <slot name="trigger" slot="trigger">
          <yt-button v-if="!drag" :class="`${prefixClass}__upload-trigger`" icon="el-icon-upload2" variant="outline">上传文件</yt-button>
        </slot>
      </el-upload>
      <slot></slot>
    </div>
    <el-table v-if="showFileList && displayFlies.length !== 0" :show-header="false" :data="displayFlies">
      <el-table-column>
        <template slot-scope="scope">
          <div :class="`${prefixClass}__display-file-name`">
            <excel-icon :class="`${prefixClass}__file-ext-icon`" v-if="isFileExtension(scope.row.name, 'excel')"/>
            <pdf-icon :class="`${prefixClass}__file-ext-icon`" v-else-if="isFileExtension(scope.row.name, 'pdf')"/>
            <ppt-icon :class="`${prefixClass}__file-ext-icon`" v-else-if="isFileExtension(scope.row.name, 'ppt')"/>
            <word-icon :class="`${prefixClass}__file-ext-icon`" v-else-if="isFileExtension(scope.row.name, 'word')"/>
            <zip-icon :class="`${prefixClass}__file-ext-icon`" v-else-if="isFileExtension(scope.row.name, 'zip')"/>
            <unknown-icon :class="`${prefixClass}__file-ext-icon`" v-else />
            <span :style="{ color: getIsUploading(scope.row) ? 'rgba(0, 0, 0, 0.6)' : 'inherit' }" >{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="showCreateName" width="180">
        <template slot-scope="scope" v-if="!getIsUploading(scope.row) && scope.row.data">
          <span :class="`${prefixClass}__display-file-who`">{{ getWho(scope.row.data) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="235" v-if="showCreateTime">
        <template slot-scope="scope">
          <el-progress text-color="rgba(0, 0, 0, 0.9)" v-if="getIsUploading(scope.row)" :percentage="scope.row.percentage" :format="formatPercentage"></el-progress>
          <span :class="`${prefixClass}__display-file-time`" v-else>{{ getUploadFinishTime(scope.row.data) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="canUpdate || canDelete || canDownload" width="100">
        <template slot-scope="scope">
          <div :class="`${prefixClass}__display-file-op`">
            <i v-if="canDownload" class="el-icon-download" @click="handleItemDownload(scope.row, scope.$index)"></i>
            <el-upload
                v-if="canUpdate && !getIsUploading(scope.row)"
                :action="action"
                :headers="headers"
                :data="extraData"
                :show-file-list="false"
                :auto-upload="autoUpload"
                :on-change="handleItemChange(scope.row, scope.$index)"
            >
              <svg :class="`${prefixClass}__upload-icon`" slot="trigger" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                  <g id="1.Base基础/3.Icon图标/操作/upload" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect id="upload-(Background)" opacity="0" x="0" y="0" width="16" height="16"/>
                      <path d="M7.50118113,2.91421127 L7.50119781,11.4999733 L8.50119781,11.4999714 L8.50118113,2.91421592 L12.2647667,6.67780113 L12.9718733,5.97069454 L8.35473212,1.3535534 C8.15946998,1.15829126 7.8428875,1.15829126 7.64762535,1.35355339 L3.03048337,5.97069502 L3.03048337,5.97069502 L3.73759019,6.67780209 L7.50118113,2.91421127 Z M2,12.9999723 C2,13.5522566 2.44771534,13.9999723 3,13.9999723 L13,13.9999723 C13.5522842,13.9999723 14,13.5522575 14,12.9999723 L14,10.9999723 L13,10.9999723 L13,12.9999723 L3,12.9999723 L3,10.9999723 L2,10.9999723 L2,12.9999723 Z" id="upload" fill-opacity="0.9" fill="#000000"/>
                  </g>
              </svg>
            </el-upload>
            <el-popover
              placement="top"
              width="200"
              v-model="visibleMap[scope.row.uid]">
                <div :class="`${prefixClass}__delete-popover-content`">
                  <div :class="`${prefixClass}__delete-tips`">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                      <g id="1.Base基础/3.Icon图标/反馈/info-circle-filled" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect id="info-circle-filled-(Background)" opacity="0" x="0" y="0" width="16" height="16"/>
                          <path d="M8,15 C11.866,15 15,11.866 15,8 C15,4.13401 11.866,1 8,1 C4.13401,1 1,4.13401 1,8 C1,11.866 4.13401,15 8,15 Z M7.3999,4 L8.59985,4 L8.59985,5.19995 L7.3999,5.19995 L7.3999,4 Z M7.50562,6.5 L7.50562,11.9998 L8.50562,11.9998 L8.50562,6.5 L7.50562,6.5 Z" id="形状" fill-opacity="0.9" fill="#ff7d00"/>
                      </g>
                    </svg>
                    <span>确认删除{{label}}</span>
                  </div>
                  <div style="text-align: right; margin: 0">
                    <yt-button :class="`${prefixClass}__delete-cancel`" @click="handleCancelDelete(scope.row, scope.$index)" variant="outline">取消</yt-button>
                    <yt-button :class="`${prefixClass}__delete-ok`" @click="handleItemDelete(scope.row, scope.$index)" variant="outline">确定</yt-button>
                  </div>
                </div>
                
                <i slot="reference" v-if="canDelete" class="el-icon-delete"></i>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import props from './props';
import { EXTENSIONS } from "./constant";
import { 
  ExcelIcon, 
  PptIcon, 
  UnknownIcon, 
  PdfIcon,
  ZipIcon,
  WordIcon
} from '../icons';

export default {
  name: "yt-upload",
  components: {
    ExcelIcon,
    PptIcon,
    UnknownIcon,
    PdfIcon,
    ZipIcon,
    WordIcon,
  },
  props: {
    ...props
  },
  data() {
    return {
      prefixClass: 'yt-upload',
      displayFlies: this.fileList,
      visibleMap: this.fileList.reduce((acc, item) => {
        acc[item.uid] = false;
      }, {})
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$emit("remove", { file, fileList });
    },
    handleExceed(files, fileList) {
      this.$emit("exceed", { files, fileList });
    },
    handleProgress(event, file, fileList) {
      // console.log("event11111", event, file, fileList);
      this.$emit("progress", { event, file, fileList });
    },
    handleBefore(file) {
      this.$emit("before", file);
      return true;
    },
    handleSuccess(response, file, fileList) {
      this.$emit("success", { response, file, fileList });
    },
    handleError(err, file, fileList) {
      this.$emit("error", { err, file, fileList });
    },
    handleChange(file, fileList ) {
      if (file.status === 'ready') {
        this.displayFlies.push(file);
        this.$set(this.visibleMap, file.uid, false);
      }
      this.$emit("change", { file, fileList });
    },
    getIsUploading(item) {
      return item.percentage < 100;
    },
    formatPercentage(percentage){
      return `${Math.floor(percentage)}%`
    },
    formatTime(val) {
      return String(val).padStart(2, '0');
    },
    getUploadFinishTime(data) {
      if (data && data.createTime) {
        return `上传时间：${data.createTime}`
      }
      return '';
    },
    isFileExtension(fileName, ext) {
      return EXTENSIONS[ext].includes(fileName.split('.').pop().toLowerCase());
    },
    handleItemChange(oldFile, index) {
      return (newFile) => {
        if (newFile.status === 'ready') {
          this.$emit("update", { oldFile, newFile, index });
          this.$set(this.visibleMap, newFile.uid, false);
        }
      }
    },
    handleItemDelete(file, index) {
      this.visibleMap[file.uid] = false;
      this.$emit("delete", { file, index });
    },
    handleCancelDelete(file) {
      this.visibleMap[file.uid] = false;
    },
    handleItemDownload(file, index) {
      // console.log('handleItemDownload', file, index)
      this.$emit('download', { file, index })
    },
    getWho(data) {
      if (data && data.createName) {
        return `上传人：${data.createName}`;
      } 
      return ''
    }
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>