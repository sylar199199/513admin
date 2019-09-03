export default {
  getCurrentRoleInfo(state) {
    let data = {}
    if (state.currentIndex !== null) {
      data = { ...state.roleList[state.currentIndex] }
    }
    return data
  },
}
