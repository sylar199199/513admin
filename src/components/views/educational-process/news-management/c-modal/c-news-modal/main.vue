<template>
  <el-dialog
    :title="showRelate.modalType === 'add' ? '新增新闻' : '编辑新闻'"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="1000px"
    top="5vh"
  >
    <div class="content">
      <span class="essential-head-txt">广告图片</span>
      <div class="headImg">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <base-form
        :form-data="formData"
        :rules="rules"
        :form-configs="formConfigs"
        ref="form"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="ok">
        确 定
      </el-button>
      <el-button :loading="loading" @click="cancel">
        取 消
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import CUploadImg from '@components/views/educational-process/adverting-management/c-upload-img'
import BaseForm from '@components/base/base-form'
import {
  formConfigs,
  formData,
  rules,
} from '@components/views/educational-process/news-management/c-modal/c-news-modal/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { SET_IMAGE_RELATE } from '@store/modules/adverting-management/mutation-types'
import { RESET_CURRENT_ADVERTING } from '@store/modules/adverting-management/mutation-types'

export default {
  name: 'c-news-modal',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      dialogVisible: false,
      formConfigs,
      formData,
      rules,
      loading: false,
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
    }
  },
  computed: {
    ...mapState('adverting-management', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
          modalType: addOrEdit,
        }
      },
      imageUrl: state => {
        return state.advertingDetails.advertImage
      },
      // 当前编辑的广告信息
      advertingDetails: state => state.advertingDetails,
    }),
  },
  // 监听current校务员的变化，并且赋值
  watch: {
    advertingDetails({
      type,
      url,
      content,
      title,
      typeChange,
      effectiveTime,
      expiryTime,
      sort,
      courseIdSign,
    }) {
      this.formData = {
        url,
        type,
        content,
        title,
        typeChange,
        sort,
        courseIdSign,
      }
      // 时间回显
      this.formData.date = [new Date(effectiveTime), new Date(expiryTime)]
      deep: true
    },
  },
  methods: {
    ...mapActions('adverting-management', [
      'addAdverting',
      'getAdvertingList',
      'updateAdverting',
    ]),
    ...mapMutations('adverting-management', [SET_ADVERTING_RELATE]),
    ...mapMutations('adverting-management', [SET_IMAGE_RELATE]),
    ...mapMutations('adverting-management', [RESET_CURRENT_ADVERTING]),
    submit() {},
    handleAvatarSuccess(res, file) {
      let setimageUrl = res.data[0].url
      this[SET_IMAGE_RELATE]({ setimageUrl })
      this.type = file.raw.type
    },
    beforeAvatarUpload(file) {
      this.loading = true
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
      }
      this.loading = false
      return file.type === 'image/jpeg' || file.type === 'image/png'
    },
    async ok() {
      // 校验
      let [effectiveTime, expiryTime] = this.$refs.form.form.date
      let { content, courseId, sort, title, url, type } = this.$refs.form.form
      let paramsDate = {
        advertImage: this.imageUrl,
        type,
        url,
        effectiveTime,
        expiryTime,
        content,
        courseId,
        sort,
        title,
      }
      if (this.showRelate.modalType === 'add') {
        const res = await this.addAdverting(paramsDate)
        if (res) {
          this.$message.success('添加成功')
          await this.getAdvertingList()
          this.cancel()
        }
      } else {
        paramsDate.idSign
        const res = await this.updateAdverting(paramsDate)
        if (res) {
          this.$message.success('修改成功')
          await this.getAdvertingList()
          this.cancel()
        }
      }
    },
    // 取消
    cancel() {
      if (this.showRelate.modalType !== 'add') {
        this[RESET_CURRENT_ADVERTING]()
      }
      this.$refs.form.reset()
      this[SET_ADVERTING_RELATE]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.essential-head-txt {
  margin-left: 35px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  position: relative;
  left: -22px;
  top: -61px;
}
.headImg {
  margin-left: -10px;
  margin-bottom: 15px;
  width: 100px;
  height: 100px;
  border: 1px #eee solid;
  display: inline-block;
  margin-right: 30px;
  overflow: hidden;

  img {
    width: 100px;
    height: 100px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 98px;
  height: 95px;
  line-height: 104px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.c-student-modal {
}
</style>
