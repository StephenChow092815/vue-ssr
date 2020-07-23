// router.js
import Vue from 'vue';
import Router from 'vue-router';
const Test = () => require('./components/Test.vue')
const HelloWorld = () => require('./components/HelloWorld.vue')
Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/test',
                component: Test
            },
            {
                path: '/hello',
                component: HelloWorld
            }
        ],
    });
}