<template>
  <el-dialog
    title="广告详情"
    :show-close="false"
    :visible.sync="showRelate"
    :close-on-click-modal="false"
    @close="cancel"
    width="1000px"
    top="5vh"
  >
    <div class="details-main">
      <div class="details-left">
        <img :src="advertingDetails.advertImage" />
      </div>
      <div class="details-right">
        <div class="title">
          {{ advertingDetails.title }}
        </div>
        <div class="details-model">
          <span class="details-key">广告存放位置说明 :</span>
          <span class="details-value">
            {{ content }}
          </span>
        </div>
        <div class="details-model">
          <span class="details-key">生效时间 :</span>
          <span class="details-value">{{
            advertingDetails.effectiveTime
          }}</span>
          <span class="details-key2">失效时间 :</span>
          <span class="details-value"> {{ advertingDetails.expiryTime }} </span>
        </div>
        <div class="details-model">
          <span class="details-key">排序 :</span>
          <span class="details-value"> {{ advertingDetails.sort }}</span>
        </div>
        <div class="details-model">
          <span class="details-key">跳转地址 :</span>
          <span class="details-value"> {{ advertingDetails.url }} </span>
        </div>
        <div class="details-model">
          <span class="details-key">关联课程 :</span>
          <span class="details-value">
            {{ advertingDetails.courseIdSign }}
          </span>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="cancel">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { SET_ADVERTING_RELATE } from '@store/modules/adverting-management/mutation-types'
import { SET_IMAGE_RELATE } from '@store/modules/adverting-management/mutation-types'
import { RESET_CURRENT_ADVERTING } from '@store/modules/adverting-management/mutation-types'
import { DISPLAY_ADVERTING_DETAILS } from '@store/modules/adverting-management/mutation-types'

export default {
  name: 'c-adverting-details',
  data() {
    return {
      dialogVisible: false,
      loading: false,
    }
  },
  computed: {
    ...mapState('adverting-management', {
      // modal框显示隐藏依赖的数据
      showRelate: state => {
        return state.show.details
      },
      // 当前编辑的广告信息
      advertingDetails: state => state.advertingDetails,
      content: state => {
        if (state.advertingDetails.content === '2') {
          return 'APP端首页顶部banner位'
        }
        if (state.advertingDetails.content === '1') {
          return 'PC端首页顶部banner位'
        }
      },
    }),
  },
  // 监听current校务员的变化，并且赋值
  methods: {
    ...mapMutations('adverting-management', [DISPLAY_ADVERTING_DETAILS]),
    // 取消
    cancel() {
      this[DISPLAY_ADVERTING_DETAILS]({
        isShow: false,
        key: 'details',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.details-main {
  font-size: 16px;
  margin-left: 100px;
  display: flex;
  img {
    height: 100%;
    width: 100%;
  }
  .details-left {
    background: #333333;
    width: 400px;
    height: 250px;
  }
  .details-right {
    font-weight: 600;
    margin-left: 30px;
    width: 500px;
    height: 170px;
    .title {
      font-size: 18px;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      margin-top: 10px;
    }
    .details-model {
      margin-top: 20px;
      font-size: 14px;
      .details-key {
        color: rgba(128, 128, 128, 1);
      }
      .details-key2 {
        color: rgba(128, 128, 128, 1);
        margin-left: 10px;
      }
      .details-value {
        color: rgba(51, 51, 51, 1);
        margin-left: 15px;
      }
    }
  }
}
.c-student-modal {
}
</style>
