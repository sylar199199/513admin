export default {
  getCurrentBulletin(state) {
    return index => {
      return state.bulletinList[index]
    }
  },
}
