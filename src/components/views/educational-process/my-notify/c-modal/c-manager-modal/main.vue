<template>
  <el-dialog
    title="通知详情"
    :visible.sync="showRelate.show"
    :close-on-click-modal="false"
    @close="cancel"
    width="900px"
    top="5vh"
  >
    <div class="details-main">
      <div class="notify-title">
        <span>{{ bulletType.title }}</span>
      </div>
      <div class="notify-time">
        <span>{{ bulletType.createTime }}</span>
      </div>
      <div class="notify-content" v-html="marked2html()"></div>
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_MODAL_DETAIL } from '@store/modules/announcements/mutation-types'
import marked from 'marked'

export default {
  name: 'c-manager-modal',
  data() {
    return {
      dialogVisible: false,
      loading: false,
    }
  },
  computed: {
    ...mapState('announcements', {
      // modal框显示隐藏依赖的数据
      showRelate: ({ show, addOrEdit }) => {
        return {
          show: show.addOrEdit,
        }
      },
      // 当前编辑的通知信息
      bulletType: state => state.bulletType,
    }),
  },
  // 监听current校务员的变化，并且赋值
  methods: {
    ...mapMutations('announcements', [SET_MODAL_DETAIL]),
    marked2html() {
      let str = this.bulletType.content
      if (str === undefined || str === null) {
        str = ''
      }
      return marked(str)
    },
    ok() {
      this[SET_MODAL_DETAIL]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
    // 取消
    cancel() {
      this[SET_MODAL_DETAIL]({
        isShow: false,
        key: 'addOrEdit',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.details-main {
  font-size: 16px;
  margin-left: 10px;
  .notify-title {
    font-weight: 600;
    font-size: 18px;
  }
  .notify-time {
    font-size: 12px;
    margin-top: 20px;
  }
  /deep/.notify-content {
    p {
      width: 800px;
      overflow: hidden;
      font-size: 14px;
      margin-top: 20px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
