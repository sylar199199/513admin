<template>
  <div id="app">
    <!-- 判断是否为login页面 -->
    <login-layout v-if="$route.name === 'login' && !isLogoutState" />
    <view-layout v-if="$route.name !== 'login' && isLogin" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LoginLayout from '@/layouts/login-layout'
import ViewLayout from '@/layouts/view-layout'
import { createPermissionRoute } from '@/router/route'
import { login as isLogin } from '@mixins/locality'

export default {
  components: {
    'view-layout': ViewLayout,
    'login-layout': LoginLayout,
  },
  mixins: [isLogin],
  computed: {
    ...mapState('auth', {
      isLogoutState: state => state.logoutState,
      menuList: state => state.menuList,
    }),
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    // 监听登录状态的变化，并且为true的时候，动态添加路由
    isLogin(newVal) {
      if (newVal) {
        this.$router.addRoutes(createPermissionRoute(this.menuList))
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
