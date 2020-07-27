// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      test: '000'
    },
    actions: {
      test (context) {
        setTimeout(() => {
          context.commit('test', '111')
        }, 2000)
      },
      generate (context) {
        setTimeout(() => {
          let data = [
            {
              name: 'HelloWorld',
              test: 1
            },
            {
              name: 'Test',
              test: 2
            },
          ]
          context.commit('generate', data)
        }, 2000)
      }
    },
    mutations: {
      test (state, data) {
        state.test = data
      },
      generate (state, data) {
        state.comsData = data
      }
    },
    modules: {},
  })
}
