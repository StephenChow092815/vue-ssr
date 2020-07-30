// router.js
import Vue from 'vue'
import Router from 'vue-router'
// const Test = () => require('./components/Test.vue')
// const HelloWorld = () => require('./components/HelloWorld.vue')
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import NotFount from './components/404.vue'
import Generate from './views/Generate.vue'
Vue.use(Router)

export function createRouter() {
  let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
      },
      {
        path: '/test',
        name: 'Test',
        component: Test,
      },
      {
        path: '/generate',
        name: 'Generate',
        component: Generate,
      },
      {
        path: '*',
        name: '404',
        component: NotFount,
      },
    ],
  })
  router.beforeEach((from, to, next) => {
    next()
  })
  return router
}
