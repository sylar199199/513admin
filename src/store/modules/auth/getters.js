export default {
  checkPermission({ thirdPermission }) {
    return perm => {
      return thirdPermission.some(item => {
        return item.name === perm
      })
    }
  },
}
