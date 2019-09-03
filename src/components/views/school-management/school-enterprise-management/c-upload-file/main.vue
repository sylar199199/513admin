<template>
  <el-upload
    v-bind="$attrs"
    :file-list="fileList"
    :before-remove="beforeRemove"
  >
    <el-button size="small" type="primary">
      点击上传
    </el-button>
    <div slot="tip" class="el-upload__tip">上传合同文件<br />(接受pdf格式)</div>
  </el-upload>
</template>
<script>
export default {
  name: 'certificated-information',
  props: {
    fileName: {
      type: String,
      default: '',
    },
    fileUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileList: [],
    }
  },
  computed: {
    fileData() {
      return {
        name: this.fileName,
        url: this.fileUrl,
      }
    },
  },
  watch: {
    fileData(cur) {
      this.fileList = [cur]
    },
  },
  methods: {
    beforeRemove() {
      return false
    },
  },
}
</script>
<style lang="scss" scoped></style>
