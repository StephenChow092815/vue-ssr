<template>
  <div class="generate">
    <com-recursion :coms="comsData"></com-recursion>
  </div>
</template>

<script>
import Vue from 'vue'
import ComRecursion from '../components/ComRecursion'
// import Test from '../components/Test'
export default Vue.extend({
  asyncData ({ store}) {
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
      console.log(val, 'generate')
    }
  },
  computed: {
    comsData () {
      return this.$store.getters.getComsList
    }
  }
})
</script>