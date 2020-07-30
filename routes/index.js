const Router = require('koa-router');
const router = new Router();

const isDev = process.env.SSR_ENV === 'dev';

// render函数
const renderToString = isDev ? require('../dev.ssr') : require('../prod.ssr');
router.get('/', async (ctx, next) => {
    let html = '';
    // html = await renderToString(ctx);
    // try {
    //     html = await renderToString(ctx);
    //     console.log(html, '---')
    //     // ctx.body = html;
    //     next();
    // } catch(e) {
    //     console.log(e, html, '---')
    // }
});
router.get('/test', async (ctx) => {
    let html = '';
    // html = await renderToString(ctx);
    try {
        html = await renderToString(ctx);
        // ctx.body = html;
    } catch(e) {
        console.log(e)
    }
});
module.exports = router.routes();