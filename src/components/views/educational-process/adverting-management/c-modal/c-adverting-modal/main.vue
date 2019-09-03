<template>
  <el-dialog
    :title="showRelate.modalType === 'add' ? '新增广告' : '编辑广告'"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="800px"
    top="5vh"
  >
    <div class="content">
      <base-form
        style="margin-top: 20px"
        :form-data="formData"
        :rules="rules"
        :form-configs="_formConfigs"
        ref="form"
      />
      <div class="icon-star">
        <img src="@assets/icon/icon-star.png" width="100%" height="100%" />
      </div>
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
      <div class="tips-message">
        <ul>
          <li>说明:</li>
          <li>PC端广告图片，大小不能超过1MB，尺寸建议1920*560像素</li>
          <li>APP端广告图片，大小不能超过300KB，尺寸建议750*430像素</li>
        </ul>
      </div>
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
} from '@components/views/educational-process/adverting-management/c-modal/c-adverting-modal/form-config'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { SET_IMAGE_RELATE } from '@store/modules/adverting-management/mutation-types'
import { RESET_CURRENT_ADVERTING } from '@store/modules/adverting-management/mutation-types'

export default {
  name: 'c-student-modal',
  components: {
    'base-form': BaseForm,
  },
  data() {
    return {
      moduleType: {},
      dialogVisible: false,
      formConfigs,
      formData,
      rules,
      loading: false,
      picture: 3,
      uploadUrl: process.env.VUE_APP_BASE_URL + '/file/upload',
      options: [
        {
          label: 'APP',
          value: '1',
        },
        {
          label: 'PC',
          value: '2',
        },
        {
          label: 'PC和APP',
          value: '3',
        },
      ],
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
      // 下拉选
      _formConfigs() {
        const types = Object.keys(this.moduleType).map(key => {
          return {
            label: this.moduleType[key].courseName,
            value: this.moduleType[key].sign,
          }
        })
        return this.formConfigs(types)
      },
    }),
  },
  // 监听广告详情的的变化，并且赋值
  watch: {
    advertingDetails({
      type,
      url,
      content,
      title,
      effectiveTime,
      expiryTime,
      sort,
      courseIdSign,
    }) {
      this.formData = {
        url,
        content,
        title,
        sort,
        courseIdSign,
      }
      url === ''
        ? this.formData.typeChange === '课程'
        : this.formData.typeChange === '链接'
      this.type = type
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
      'getAllCourseSelectList',
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
      let content = this.$refs.form.form.content
      const isLt300KB = file.size / 1024 < 300
      const isLt1MB = file.size / 1024 / 1024 < 1
      this.loading = true
      if (content === '1') {
        if (!isLt1MB) {
          this.$message.error('上传PC图片大小不能超过 1MB!')
          this.loading = false
          return false
        } else {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
          }
          this.loading = false
          return file.type === 'image/jpeg' || file.type === 'image/png'
        }
      } else {
        if (!isLt300KB) {
          this.$message.error('上传APP图片大小不能超过 300KB!')
          this.loading = false
          return false
        } else {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
          }
          this.loading = false
          return file.type === 'image/jpeg' || file.type === 'image/png'
        }
      }
    },
    async ok() {
      // 校验
      let [effectiveTime, expiryTime] = this.$refs.form.form.date
      let {
        content,
        courseId,
        sort,
        title,
        url,
        type,
        typeChange,
      } = this.$refs.form.form
      let paramsDate = {
        advertImage: this.imageUrl,
        typeChange,
        url,
        effectiveTime,
        expiryTime,
        content,
        courseId,
        sort,
        title,
      }
      if (paramsDate.typeChange === '链接') {
        this.$refs.form.form.courseId === ''
        paramsDate.courseId = ''
      } else if (paramsDate.typeChange === '课程') {
        this.$refs.form.form.url === ''
        paramsDate.url = ''
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
      ;(this.type = ''), this.$refs.form.reset()
      this[SET_ADVERTING_RELATE]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
  async mounted() {
    const res = await this.getAllCourseSelectList()
    if (res.ok) {
      this.moduleType = res.data
    }
  },
}
</script>
<style lang="scss" scoped>
.icon-star {
  position: relative;
  top: 95px;
  left: -1px;
  height: 6px;
  width: 6px;
}
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
  width: 200px;
  height: 150px;
  border: 1px #eee solid;
  display: inline-block;
  margin-right: 30px;
  overflow: hidden;

  img {
    width: 200px;
    height: 150px;
  }
}
.tips-message {
  color: #333333;
  ul > li:nth-child(2) {
    font-size: 12px;
    color: darkgray;
    margin-top: 5px;
  }
  ul > li:nth-child(3) {
    font-size: 12px;
    color: darkgray;
    margin-top: 5px;
  }
  position: relative;
  top: -70px;
  height: 10px;
  margin-left: 300px;
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
  width: 150px;
  height: 95px;
  line-height: 150px;
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
