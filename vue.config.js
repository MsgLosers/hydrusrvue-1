module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.scss']
    },
    entry: process.env.BUILD_FOR_ELECTRON === 'true'
      ? { app: './src/main-electron.js' }
      : { app: './src/main.js' }
  },
  css: {
    loaderOptions: {
      sass: {
        data: process.env.VUE_APP_PRIMARY_COLOR
          ? `$primary: ${process.env.VUE_APP_PRIMARY_COLOR};`
          : '$primary: #3498db;'
      }
    }
  },
  productionSourceMap: false
}
