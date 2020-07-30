import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
// import 'element-ui/lib/theme-chalk/index.css';
import axios from './fetch'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// new Vue({
//   render: h => h(App),
//   router: createRouter()
// }).$mount('#app');

export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })
  return { app, router, store }
}
