<template>
  <el-dialog
    title="请选择文件上传"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="cancel"
    width="800px"
    top="5vh"
  >
    <el-row class="content">
      <el-col :span="6">
        Excel文件
      </el-col>
      <el-col :span="12">
        <base-upload
          suffix-src="/teacher/importExcel"
          :limit-size="10"
          accept=".xls,.xlsx"
          @handle-upload="uploadSuccess"
        />
      </el-col>
      <el-col :span="6">
        <a :href="teacherDownloadUrl" download="downloadTeacher"
          >点击下载模板</a
        >
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        温馨提示
      </el-col>
      <el-col :span="18">
        <ul>
          <li>
            1、请严格按照模板内容上传文件，否则有可能导致上传失败；
          </li>
          <li>
            2、教师工号唯一，不可重复，需真实填写教师姓名；
          </li>
          <li>
            3、请勿上传重复记录，带*号列为必填项，其余为选填项；
          </li>
        </ul>
        <div class="img-box">
          <img :src="execelTemplate" />
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">
        关 闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import BaseUpload from '@components/base/base-upload'
import execelTemplate from '@assets/images/school-teacher-excel-template.jpg'
import { mapState, mapMutations, mapActions } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/school-teacher/mutation-types'
export default {
  name: 'c-upload-modal',
  components: {
    'base-upload': BaseUpload,
  },
  data() {
    return {
      dialogVisible: false,
      execelTemplate,
    }
  },
  computed: {
    ...mapState('school-teacher', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.upload,
          modalType: addOrEdit,
        }
      },
      teacherDownloadUrl: state => state.teacherUrl,
    }),
  },
  methods: {
    ...mapActions('school-teacher', [
      'getAllTeacherLists',
      'getTeacherDownloadUrl',
    ]),
    ...mapMutations('school-teacher', [SET_MODAL_RELATE]),
    // 取消
    cancel() {
      this[SET_MODAL_RELATE]({
        isShow: false,
        key: 'upload',
      })
    },
    // 上传成功获取的钩子
    uploadSuccess() {
      this.cancel()
      this.getAllTeacherLists()
    },
  },
}
</script>
<style lang="scss" scoped>
.content {
  height: 32px;
  line-height: 32px;
  margin-bottom: 30px;
  > div {
    height: 100%;
  }
}
ul li {
  line-height: 30px;
  color: #f00;
}
.img-box {
  width: calc(100% - 200px);
  margin-top: 20px;
  img {
    width: 100%;
  }
}
</style>
