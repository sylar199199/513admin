<template>
  <div class="c-upload-img">
    <el-upload
      class="auth-img-uploader"
      :show-file-list="false"
      v-bind="$attrs"
    >
      <img v-if="imageUrl" :src="imageUrl" class="auth-img" />
      <i v-else class="el-icon-plus auth-img-uploader-icon" />
      <div slot="tip" class="el-upload__tip" style="textAlign:center">
        {{ propName.name || '' }}
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'certificated-information',
  props: {
    propName: {
      type: Object,
      default: () => {},
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.c-upload-img {
  display: inline-block;
  .auth-img-uploader {
    display: inline-block;
    .auth-img-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .auth-img {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .auth-name {
    font-size: 14px;
    width: 180px;
    margin-top: 10px;
    text-align: center;
    line-height: 14px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
