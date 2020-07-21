// prod.ssr.js
const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const resolve = file => path.resolve(__dirname, file);

const { createBundleRenderer } = require('vue-server-renderer');

const bundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(resolve('../dist/index.html'), 'utf-8'),
    clientManifest,
});
const renderToString = (context) => {
    
    return new Promise((resolve, reject) => {
        // console.log(renderer, 11111)
        renderer.renderToString(context, (err, html) => {
            // console.log(context, 2222)
            // console.log(html, 3333)
            err ? reject(err) : resolve(html);
        });
    });
};

// router.get('/test', async (ctx) => {
//     console.log('prod')
//     let html = '';
//     try {
//         html = await renderToString(ctx);
//         console.log(html, '---')
//         ctx.body = html;
//     } catch(e) {
//         console.log(e, html, '---')
//     }
// });

module.exports = renderToString;