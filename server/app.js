// app.js
const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');
const favicon = require('koa-favicon');

const isDev = process.env.SSR_ENV === 'dev';
console.log(process.env.NODE_ENV)
console.log(isDev, 'node env')
// routes
const ssr = isDev ? require('./dev.ssr') : require('./prod.ssr');

// Static File Server
const resolve = file => path.resolve(__dirname, file);
app.use(favicon(resolve('./favicon.ico')));
app.use(koaMount('/', koaStatic(resolve('../public'))));

app.use(ssr.routes(), ssr.allowedMethods());

module.exports = app;