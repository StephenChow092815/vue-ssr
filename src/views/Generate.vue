<template>
  <div class="generate">
    <com-recursion :coms="comsData"></com-recursion>
  </div>
</template>

<script>
import ComRecursion from '../components/ComRecursion'
// import Test from '../components/Test'
export default {
  asyncData ({ store, route, options }) {
    console.log(store, route, options, 'async data', '------')
    return store.dispatch('generate');
  },
  components: {
    // HelloWorld,
    // Test
    ComRecursion
  },
  created () {
    console.log(1)
  },
  watch: {
    comsData (val) {
      console.log(val)
    }
  },
  computed: {
    comsData () {
      return this.$store.comsData
    }
  }
}
</script>