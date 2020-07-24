const webpack = require('webpack')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
// webpack配置文件
const webpackConf = require('@vue/cli-service/webpack.config')
const { createBundleRenderer } = require('vue-server-renderer')
const serverCompiler = webpack(webpackConf)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

// 监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach((error) => console.error(error))
  stats.warnings.forEach((warn) => console.warn(warn))
  const bundlePath = path.join(
    webpackConf.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('New bundle generated.')
})

const handleRequest = async (ctx) => {
  if (!bundle) {
    ctx.body = '等待webpack打包完成后再访问'
    return
  }

  // 获取最新的 vue-ssr-client-manifest.json
  const clientManifestResp = await axios.get(
    `http://localhost:8080/vue-ssr-client-manifest.json`
  )
  const clientManifest = clientManifestResp.data

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8'),
    clientManifest,
  })

  return renderer
}

const renderToString = (context, renderer) => {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

router.get('*', async (ctx) => {
  console.log(ctx, 'server route')
  const renderer = await handleRequest(ctx)
  try {
    const html = await renderToString(ctx, renderer)
    console.log(html)
    ctx.body = html
  } catch (e) {
    console.log(e, 'error')
  }
})

module.exports = router
