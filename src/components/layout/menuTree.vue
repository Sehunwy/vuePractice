<template>
  <div>
    <label v-for="menu in data" :key="menu.index">
      <el-submenu :index="menu.name" v-if="menu.children">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ menu.name }}</span>
        </template>
        <menuTree :data="menu.children"></menuTree>
      </el-submenu>
      <el-menu-item v-else :index="menu.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ menu.name }}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: "menuTree",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  props: {
    data: {},
  },
};
</script>

<style scoped lang="less">
</style>
