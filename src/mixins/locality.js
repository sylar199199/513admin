import BaseCountdownModal from '@components/base/base-countdown-modal'
import { mapState } from 'vuex'
// 登陆相关
export const login = {
  computed: {
    ...mapState('auth', {
      isLogin: state => {
        return state.isLogin
      },
    }),
  },
}
// TODO:可以后期尝试使用高阶函数的形式，返回一个对象
// 搜索条件相关
export const searchCondition = {
  computed: {
    keyWords() {
      return this.$route.query.search
    },
  },
  watch: {
    // 监听query search变动 查找对应的数据
    keyWords: {
      handler(cur) {
        // undefind，为初始进入状态，无需参数
        if (!cur) {
          this.handleGetDataByCondition()
        } else {
          this.handleGetDataByCondition({
            ...this.$qs.parse(cur),
          })
        }
      },
      immediate: true,
    },
  },
}

// 重置账号相关 校企 用户 校务员
export const resetAccountpassword = {
  components: {
    'base-countdown-modal': BaseCountdownModal,
  },
  data() {
    return {
      show: false,
      counts: 5,
      accountInfoConfigs: [],
    }
  },
  methods: {
    resetAccountPassword(name, sign, callback) {
      const h = this.$createElement
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '是否重置用户： '),
          h('i', { style: 'color: teal' }, name),
          h('span', null, '的密码?'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'loading...'
            const res = await await this.resetPassword(sign)
            if (res.ok) {
              this.$message.success('重置成功!')
              if (typeof callback === 'function') callback(res.data)
            }
            done()
            instance.confirmButtonLoading = false
          } else {
            done()
          }
        },
      }).catch(() => {
        this.$message.info('取消重置!')
      })
    },
  },
}

// 课程上架、下架
export const courseShelves = () => {
  return {
    methods: {
      shelves({ releaseStatus, courseName, idSign }, callback = null) {
        const isPutaway = releaseStatus !== '未发布'
        const h = this.$createElement
        this.$msgbox({
          title: (isPutaway && '警告') || '提示',
          message: h('p', null, [
            h('span', null, `是否： ${(isPutaway && '上架') || '下架'}课程：`),
            h('i', { style: 'color: teal' }, courseName),
            h('span', null, '?'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = 'loading...'
              const res = await await this.updateReleaseStatus({
                idSign: idSign,
                releaseStatus: !isPutaway,
              })
              if (res.ok) {
                this.$message.success(`${(isPutaway && '下架') || '上架'}成功!`)
                if (typeof callback === 'function') callback()
              }
              done()
              instance.confirmButtonLoading = false
            } else {
              done()
            }
          },
        }).catch(() => {
          this.$message.info('取消上架或者下架课程')
        })
      },
    },
  }
}
