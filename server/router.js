const Router = require('koa-router');
const router = new Router();
const index = require('./routes/index.js');
router.use('/about', index);
module.exports = router;