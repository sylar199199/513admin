import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import qs from 'qs'
import router from './router/index.js'
import store from './store/index.js'
import { sync } from 'vuex-router-sync'
import '@/directive/global'
// element
import '@/element'
// global components
import '@components'
// reset.css
import '@assets/reset/index.css'
// element theme
import '@assets/scss/element-variables.scss'
// global
import '@assets/scss/global.scss'

Vue.config.productionTip = false
sync(store, router, { moduleName: 'route' })
// TODO:挂载qs 后期挂载的东西多可以将这一类代码提取到一个文件里面
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
