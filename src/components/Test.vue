<template>
  <div>{{test}}</div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  asyncData ({ store, route, options }) {
    // return store.dispatch('fetchData', {
    //   options,
    // });
    console.log(store, route, options, 'async data', '------')
    // const _this = this
    // setTimeout(() => {
    //   this.msg = 'world'
    //   console.log(this)
    //   // _this.$forceUpdate()
    //   return this
    // }, 3000)
    return store.dispatch('test');
  },
  computed: {
    test () {
      return this.$store.state.test
    }
  },
  watch: {
    test (val) {
      console.log(val, 'watch on u')
    }
  },
  data () {
    return {
      msg: 'test'
    }
  },
  methods: {

  }
})
</script>