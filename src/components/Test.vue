<template>
  <div>{{test}}</div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  created () {
    console.log('test created')
  },
  asyncData ({ store }) {
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