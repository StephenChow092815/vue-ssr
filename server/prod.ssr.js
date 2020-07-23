// prod.ssr.js
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const resolve = file => path.resolve(__dirname, file);

const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('vue-ssr-server-bundle.json');
const clientManifest = require('vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve('index.html'), 'utf-8'),
    clientManifest,
});

const renderToString = (context) => {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
};

router.get('*', async (ctx) => {
    let html = '';
    try {
        html = await renderToString(ctx);
        ctx.body = html;
    } catch(e) {}
});

module.exports = router;