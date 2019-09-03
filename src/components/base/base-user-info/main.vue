<template>
  <div class="base-user-info">
    <div class="avatar-box">
      <img :src="usePhoto" alt="" class="headCircle" />
    </div>
    <p class="user-name">
      {{ useName }}
    </p>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'base-user-info',
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
}
</script>
<style lang="scss" scoped>
.base-user-info {
  padding: 20px 50px 40px;
  .avatar-box {
    width: 100px;
    height: 100px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    margin-top: 10px;
    color: #999999;
    font-size: 14px;
  }
}
</style>
