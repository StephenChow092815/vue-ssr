// vue.config.js
// const path = require('path');
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const entry = TARGET_NODE ? 'server' : 'client'
const isPro = process.env.NODE_ENV !== 'development'
module.exports = {
  /**
   * 静态资源在请求时，如果请求路径为相对路径，则会基于当前域名进行访问
   * 在本地开发时，为保证静态资源的正常加载，在8080端口启动一个静态资源服务器
   * 该处理将会在第四小节《Node端开发环境配置》中进行详细介绍
   */
  publicPath: isPro ? '/' : 'http://127.0.0.1:8080/',
  outputDir: 'dist',
  pages: {
    index: {
      entry: `src/entry-${entry}.js`,
      template: 'public/index.html',
    },
  },
  css: {
    extract: isPro ? true : false,
  },
  chainWebpack: (config) => {
    // 关闭vue-loader中默认的服务器端渲染函数
    config.optimization.splitChunks(undefined)
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        merge(options, {
          optimizeSSR: false,
        })
      })
    config.plugin('html-index').tap((options) => {
      options[0].minify = false
      return options
    })
    //
    // config.module
    //   .rule('icon')
    //   .test(/\.(woff|woff2|eot|ttf|otf)$/)
    //   .use('file-loader')
  },
  configureWebpack: {
    // 需要开启source-map文件映射，因为服务器端在渲染时，
    // 会通过Bundle中的map文件映射关系进行文件的查询
    devtool: 'source-map',
    // 服务器端在Node环境中运行，需要打包为类Node.js环境可用包（使用Node.js require加载chunk）
    // 客户端在浏览器中运行，需要打包为类浏览器环境里可用包
    target: TARGET_NODE ? 'node' : 'web',
    // 关闭对node变量、模块的polyfill
    node: TARGET_NODE ? undefined : false,
    output: {
      // 配置模块的暴露方式，服务器端采用module.exports的方式，客户端采用默认的var变量方式
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    // 外置化应用程序依赖模块。可以使服务器构建速度更快
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: [/\.css$/],
        })
      : undefined,
    plugins: [
      // 根据之前配置的环境变量判断打包为客户端/服务器端Bundle
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
  },
}
