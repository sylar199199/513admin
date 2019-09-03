// 节流函数
export const throttle = (func, gapTime) => {
  let _lastTime = null
  return () => {
    let _nowTime = +new Date()
    if (!_lastTime || _nowTime - _lastTime > gapTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

// 生成递归函数 获取多维数组里面匹配的label值以及其祖先级的label值
export const getDepartmentArr = (key, arrCollect) => {
  let list = []
  return function recursionFunc(arr) {
    return arr.some((item, index, arr) => {
      list.push(item.label)
      if (item.label === key) {
        arrCollect.push(list)
        return true
      } else {
        if (item.children.length === 0) {
          if (index === arr.length - 1) {
            list = []
          } else {
            list.pop()
          }
          return false
        } else {
          return recursionFunc(item.children)
        }
      }
    })
  }
}
export const DepartmentRecursion = arr => {
  return arr.map(item => {
    if (item.hasOwnProperty('children') && item.children.length === 0) {
      const current = {
        ...item,
      }
      delete current.children
      return {
        ...current,
      }
    } else {
      return {
        ...item,
        children: DepartmentRecursion(item.children),
      }
    }
  })
}
