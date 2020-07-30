// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './fetch'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      test: '000',
      comsData: []
    },
    getters: {
      getComsList: state => state.comsData
    },
    actions: {
      test (context) {
        setTimeout(() => {
          context.commit('test', '111')
        }, 2000)
      },
      generate (context) {
        // setTimeout(() => {
        //   let data = [
        //     {
        //       name: 'HelloWorld',
        //       test: 1
        //     },
        //     {
        //       name: 'Test',
        //       test: 2
        //     },
        //   ]
        //   context.commit('generate', data)
        // }, 2000)
        axios.get('http://localhost:8888/mock/11/test')
          .then((res) => {
            console.log(res, 'fanhui')
            context.commit('generate', res.data.data)
          })
      }
    },
    mutations: {
      test (state, data) {
        state.test = data
        console.log(state, data, 'test end')
      },
      generate (state, data) {
        state.comsData = data
        console.log(state, data, 'generate end')
      }
    },
    modules: {},
  })
}
