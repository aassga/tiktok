const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    https: false,
    // 以上的ip和埠号是我们本机的;下面为需要跨域的
    proxy: {    //配置跨域
      '/': {
        target: "http://localhost:3000", // 動態環境
        ws: false,     // 如果要代理 websockets
        changOrigin: true,  // 允许跨域
      },
    }
  },
})
