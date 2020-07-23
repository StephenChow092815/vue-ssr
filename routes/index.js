const Router = require('koa-router');
const router = new Router();

const isDev = process.env.SSR_ENV === 'dev';

// render函数
const renderToString = isDev ? require('../dev.ssr') : require('../prod.ssr');
router.get('/', async (ctx, next) => {
  console.log('prod /')
    let html = '';
    // html = await renderToString(ctx);
    console.log(ctx)
    // try {
    //     html = await renderToString(ctx);
    //     console.log(html, '---')
    //     // ctx.body = html;
    //     next();
    // } catch(e) {
    //     console.log(e, html, '---')
    // }
    console.log('end')
});
router.get('/test', async (ctx) => {
    console.log('prod test')
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
module.exports = router.routes();