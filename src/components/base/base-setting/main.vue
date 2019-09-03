<template>
  <div class="base-setting">
    <div class="userPhoto-setting" @click="myDetails()">
      <img :src="usePhoto" alt="" class="headCircle" />
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ useName }}<i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="myDetails()">我的信息</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="editPassword()">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="loginOut($router)">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { SET_MODAL_RELATE } from '@store/modules/base-details/mutation-types'
import { SET_PASSWORD_MODAL } from '@store/modules/base-details/mutation-types'

export default {
  name: 'base-setting',
  computed: {
    ...mapState('auth', {
      // 获取用户头像
      usePhoto: state => {
        return state.userInfo.photo
      },
      // 获取用户昵称
      useName: state => state.userInfo.name,
    }),
  },
  methods: {
    ...mapActions('auth', ['loginOut']),
    ...mapActions('base-details', ['getSelectByManagerId']),
    ...mapMutations('base-details', [SET_MODAL_RELATE]),
    ...mapMutations('base-details', [SET_PASSWORD_MODAL]),
    async myDetails() {
      await this[SET_MODAL_RELATE]({
        key: 'addOrEdit',
        isShow: true,
        methord: 'edit',
      })
      await this.getSelectByManagerId()
    },
    async editPassword() {
      await this[SET_PASSWORD_MODAL]({
        key: 'editPassword',
        isShow: true,
      })
      await this.getSelectByManagerId()
    },
  },
}
</script>
<style lang="scss" scoped>
.base-setting {
  display: flex;
  height: 55%;
  > div {
    padding: 0 10px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    line-height: 48px;
  }
}
.userPhoto-setting {
  margin-top: -5px;
  width: 75px;
  height: 70px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 30px;
  overflow: hidden;

  img {
    width: 100%;
    height: 80%;
    border-radius: 50%;
  }
}
</style>
