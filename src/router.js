// router.js
import Vue from 'vue';
import Router from 'vue-router';
// const Test = () => require('./components/Test.vue')
// const HelloWorld = () => require('./components/HelloWorld.vue')
Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            {
                path: '/index',
                component: () => import('./components/Test.vue')
            },
            {
                path: '/hello',
                component: () => import('./components/HelloWorld.vue')
            },
            {
                path: '/',
                redirect: '/hello'
            },
            { path: '*', component: () => import('./components/404.vue') }
        ],
    });
}