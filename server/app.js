// app.js
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const favicon = require('koa-favicon')
const fs = require('fs');
const Router = require('koa-router');
const router = new Router();

const isDev = process.env.SSR_ENV === 'dev'
// routes
const renderObj = isDev ? require('./dev.ssr') : require('./prod.ssr')

// Static File Server
const resolve = (file) => path.resolve(__dirname, file)
app.use(favicon(resolve('../public/favicon.ico')))
app.use(koaMount('/', koaStatic(resolve('../public'))))

// app.use(ssr.routes(), ssr.allowedMethods())

router.get('*', async(ctx) => {
  // const app = new Vue({
  //   data: {
  //     url: req.url
  //   },
  //   template: `<div>访问的 URL 是： {{ url }}</div>`,
  // });
  if (isDev) {
    console.log('dev')
    const renderer = await renderObj.handleRequest(ctx);
    try {
      const html = await renderObj.renderToString(ctx, renderer);
      console.log(html);
      fs.writeFile(path.resolve(__dirname, '../pages/index.html'), html, {encoding: 'utf8'}, function(err) {
        if (err) {
          throw err
        }
      })
      ctx.body = html;
    } catch(e) {}
  } else {
    console.log('prod')
    let html = ''
    try {
      html = await renderObj.renderToString(ctx)
      ctx.body = html
    } catch (e) {}
  }
  
  
})
app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen(5000);
module.exports = app
