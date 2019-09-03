const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
      .set('@plugins', resolve('src/plugins'))
      .set('@mixins', resolve('src/mixins'))
      .set('@configs', resolve('src/configs'))
      .set('@utils', resolve('src/utils'))

    if (process.env.VUE_APP_CURRENTMODE === 'production') {
      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true,
        })
        .tap(args => {})

      // 第三方库引用cdn
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        moment: 'moment',
        'vue-echarts': 'VueECharts',
      }
      config.externals(externals)
      const cdn = {
        css: [
          // element-ui css
          'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
          // nprogress css
          // 'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
          // vue
          'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
          // vue-router
          'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js',
          // vuex
          'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
          // axios
          'https://cdn.staticfile.org/axios/0.18.0/axios.min.js',
          // element-ui js
          'https://unpkg.com/element-ui/lib/index.js',
          // moment js
          'https://cdn.staticfile.org/moment.js/2.24.0/moment.min.js',
          // moment local
          'https://cdn.staticfile.org/moment.js/2.24.0/locale/zh-cn.js',
          // echarts vue-echarts
          'https://cdn.jsdelivr.net/npm/echarts@4.1.0/dist/echarts.js',
          'https://cdn.jsdelivr.net/npm/vue-echarts@4.0.2',
          // nprogress js
          // 'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js'
        ],
      }
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.VUE_APP_CURRENTMODE === 'production' ? true : false,
    // 开启 CSS source maps?
    sourceMap: process.env.VUE_APP_CURRENTMODE === 'production' ? false : true,
    // css预设器配置项
    loaderOptions: {
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only',
      },
      sass: {
        data: `@import "~@/assets/scss/variable.scss";`,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
  },
}
