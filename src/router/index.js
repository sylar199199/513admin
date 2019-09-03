import Vue from 'vue'
import Router from 'vue-router'
import store from '@store'
import { defaultRouteMaps as routes } from '@/router/route'
import { createPermissionRoute } from '@/router/route'
import cookieUtils from '@utils/cookie'

Vue.use(Router)

const router = new Router({
  mode: process.env.VUE_APP_CURRENTMODE === 'development' ? 'hash' : 'hash',
  routes,
})
router.beforeEach(async (to, from, next) => {
  const isLogin = +cookieUtils.getCookie('isLogin')
  // cookie登录状态直接进入
  if (isLogin) {
    if (to.path === '/login') {
      next('/home')
    } else {
      if (!store.state.auth.userInfo.hasOwnProperty('name')) {
        const res = await store.dispatch('auth/getLoginInfo')
        res.ok && store.state.auth.userInfo.hasOwnProperty('name') && next(to)
      } else {
        next()
      }
    }
  } else {
    if (store.state.auth.userInfo.hasOwnProperty('name')) {
      window.location.reload()
    } else {
      if (to.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  }
})

export default router
