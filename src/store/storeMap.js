// 自动加载 global 目录下的 .js 结尾的文件
const storeContext = require.context('./modules', true, /\index.js$/)

const storeModules = {}
storeContext.keys().forEach(store => {
  const storeConfig = storeContext(store)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = storeConfig.default || storeConfig
  storeModules[ctrl.name] = ctrl.config
})
export default storeModules
