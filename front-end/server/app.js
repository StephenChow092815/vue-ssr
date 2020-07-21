// app.js
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');
const favicon = require('koa-favicon');
// const router = require('./router.js');
const isDev = process.env.SSR_ENV === 'dev';

const Router = require('koa-router');
const router = new Router();
// routes
const renderToString = isDev ? require('./dev.ssr') : require('./prod.ssr');

router.get('/test', async (ctx) => {
  console.log('prod')
  let html = '';
  // html = await renderToString(ctx);
  console.log(ctx)
  console.log('fffff', '---')
  try {
      html = await renderToString(ctx);
      console.log(html, '---')
      // ctx.body = html;
  } catch(e) {
      console.log(e, html, '---')
  }
  console.log('end')
});
// Static File Server
const resolve = file => path.resolve(__dirname, file);
app.use(favicon(resolve('../dist/favicon.ico')));
// app.use(koaMount('/', koaStatic(resolve('../dist'))));
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000)
// app;
module.exports = app;