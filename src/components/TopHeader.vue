<template>
  <div class="nav">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">落地页</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="2" disabled>排行榜</el-menu-item>
      <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import { Menu, Submenu, MenuItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
export default {
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
.nav {
  padding-bottom: 10px;
}
.el-menu {
  padding-left: 200px;
}
</style>