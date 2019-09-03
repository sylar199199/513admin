export default {
  routerGetter(state, getters, rootState) {
    // 获取路由，并且匹配面包屑
    const { breadcrumbMatchList } = state
    const {
      route: { path, meta },
    } = rootState
    const pathArr = path.split('/').slice(1)
    // 因为无法通过router获取多级路由父级路由的meta信息，只能通过breadcrumbMatchList获取
    return pathArr.reduce((prev, currentValue, index) => {
      return prev.concat(
        index < pathArr.length - 1
          ? (breadcrumbMatchList.hasOwnProperty(currentValue) &&
              breadcrumbMatchList[currentValue]) ||
              []
          : {
              name: (meta.hasOwnProperty('breadText') && meta.breadText) || '',
            },
      )
    }, [])
  },
  /**
   * 获取一级标题
   * @param {*} state
   * @returns
   */
  getFirstMenuGrade(state, getters, rootState) {
    const list = rootState.auth.menuList.map(item => {
      return item
    })
    list.unshift({
      name: '首页',
      alias: 'home',
      link: '/home',
    })
    return list
  },
  getSecondMenuGrade(state, getters, rootState) {
    const secondMenu = rootState.auth.menuList.find(item => {
      return item.alias === state.first_level_active
    })
    // TODO:需要默认的菜单
    return secondMenu
      ? secondMenu.children
      : [
          {
            name: '首页',
            alias: 'home',
          },
        ]
  },
}
