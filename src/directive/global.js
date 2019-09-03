import Vue from 'vue'
import store from '@store'

const EVENT_MODAL_SHOW = 'EVENT_MODAL_SHOW'

let handle = null

Vue.directive('show-modal', {
  bind(el, binding, vnode) {
    handle = () => {
      vnode.context.$root.$emit(EVENT_MODAL_SHOW, binding.value, vnode.elm)
    }
    el.addEventListener('click', handle, vnode.elm)
  },
  unbind(el) {
    el.removeEventListener('click', handle)
  },
})

// 全局自定义指令，匹配权限三级权限池，成功显示，失败删除 , 后期可以写一个包含所有三级权限常量的集合或者对象方便统一维护
Vue.directive('permission', {
  inserted(el, binding) {
    if (
      el &&
      binding.value &&
      !store.getters['auth/checkPermission'](binding.value)
    ) {
      el.parentNode.removeChild(el)
    }
  },
})
