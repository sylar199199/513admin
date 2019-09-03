const plugins = [
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk',
    },
  ],
]
// 生产环境移除console
if (process.env.VUE_APP_CURRENTMODE === 'production') {
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
}
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
      },
    ],
  ],
  plugins,
}
