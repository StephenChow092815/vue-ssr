<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <top-header />
    <left-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
import LeftBar from './components/LeftBar.vue'

export default {
  name: 'App',
  components: {
    TopHeader,
    LeftBar
  },
  created () {
    // console.log(this.$router)
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
