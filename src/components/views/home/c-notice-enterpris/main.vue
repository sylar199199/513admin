<template>
  <div class="school-survey">
    <div class="notice-new">
      <div class="title">
        <span> 通知公告 </span>
      </div>
      <div class="more-notice" @click="jumpNotice">
        <span>更多<i class="el-icon-caret-right"></i></span>
      </div>
    </div>
    <div class="container">
      <div
        class="row-box"
        v-for="(item, key) in noticeList.homeMessageListVoList"
        :key="key"
      >
        <div>
          <span @click="getNotifyDetail(item.sign)" class="item-title">
            {{ item.title }}
          </span>
        </div>
        <div class="col-second">
          <span> {{ item.createTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { SET_MODAL_DETAIL } from '@store/modules/announcements/mutation-types'

export default {
  name: 'c-notice-enterpris',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('announcements', {
      noticeList: state => state.noticeList,
    }),
  },
  watch: {},
  methods: {
    ...mapMutations('announcements', ['SET_MODAL_DETAIL']),
    ...mapActions('announcements', ['getAllHomePage', 'getBulletinById']),
    async getNotifyDetail(sign) {
      this[SET_MODAL_DETAIL]({
        isShow: true,
        key: 'addOrEdit',
      })
      await this.getBulletinById(sign)
    },
    jumpNotice() {
      this.$router.push({
        path: `/educationalProcess/announcements/my-motify`,
      })
    },
  },
  async mounted() {
    await this.getAllHomePage()
  },
}
</script>
<style lang="scss" scoped>
.school-survey {
  overflow: hidden;
  height: 260px;
  border: 1px solid #eeeeee;
  padding: 15px;
  .notice-new {
    display: flex;
    .title {
      width: 400px;
      font-size: 16px;
      font-weight: bold;
    }
    .more-notice {
      color: dimgray;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .row-box {
    div {
      width: 400px;
    }
    display: flex;
    margin-top: 40px;
    border-bottom: 1px solid #eeeeee;
    font-size: 12px;
    .item-title {
      cursor: pointer;
    }
    .col-second {
      margin-left: 0px;
      span {
        text-align: right;
      }
    }
  }
}
</style>
