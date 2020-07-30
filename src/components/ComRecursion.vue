<template>
  <div class="cursion">
    <template v-for="(i, j) in coms">
      <div :key="i.id + '' + j">
        <hello-world v-if="i.name === 'HelloWorld'"></hello-world>
        <test v-else-if="i.name === 'Test'"></test>

      </div>
    </template>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import Test from '../components/Test'
export default {
  // name: 'ComRecursion',
  components: {
    HelloWorld,
    Test
  },
  props: {
    coms: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    coms (val) {
      console.log(val, 'cursion')
    }
  },
  created () {
    console.log(this.$store, this.coms)
  }
}
</script>