import * as types from '@store/modules/role-management/mutation-types'

export default {
  [types.SET_MODAL_SHOW](state, { key, isShow }) {
    state.show[key] = isShow
  },
  [types.SET_ROLE_LIST](state, { roleList }) {
    state.roleList = roleList
  },
  // 设置显示的项 index
  [types.SET_CURRENT_INDEX](state, { index }) {
    state.currentIndex = index
  },
  // 设置roleTree
  [types.SET_ROLE_TREE_VIEW](state, { roleTree }) {
    state.roleTree = roleTree
  },
  // 手机改变过的节点
  [types.SET_ROLE_TREE_CHECKED_CHANGE_LIST](state, { checkedChangeList }) {
    // 新建两个数组，用于保存三级变动list
    let thirdGradeList = state.thirdGradeList
    // 是否存在
    const flagIndex = thirdGradeList.findIndex(item => {
      return item.sign === checkedChangeList.sign
    })
    // 保证一点这个里面的值是ok的
    flagIndex === -1
      ? thirdGradeList.push(checkedChangeList)
      : thirdGradeList.splice(flagIndex, 1)
    state.thirdGradeList = thirdGradeList.map(item => {
      const { checked, sign, parentSign } = item
      return {
        checked,
        sign,
        parentSign,
      }
    })
  },
  // 重置tree
  [types.SET_TREE_INIT](state) {
    state.thirdGradeList = []
    state.currentIndex = null
    state.roleTree = []
  },
  // 设置account list
  [types.SET_ACCOUNT_LIST](state, { accountList }) {
    state.accountList = accountList
  },
}
