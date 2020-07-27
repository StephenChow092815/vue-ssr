<template>
  <div class="hello">
    <button @click="hello">{{msg}}</button>
  </div>
</template>

<script>
import Vue from 'vue'
// // vue组件文件
// export default Vue.extend({
//     asyncData({store, route, options}) {
//         return store.dispatch('fetchData', {
//             options,
//         });
//     },
// });
export default Vue.extend({
  asyncData ({ store, route, options }) {
    // return store.dispatch('fetchData', {
    //   options,
    // });
    console.log(store, route, options, 'async data', '------')
    // setTimeout(() => {
    //   this.msg = 'world'
    // }, 3000)
  },
  data () {
    return {
      msg: 'hello'
    }
  },
  name: 'HelloWorld',
  props: {
    // msg: String
  },
  methods: {
    hello () {
      this.$router.push('/test')
    },

  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
