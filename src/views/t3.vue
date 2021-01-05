<template>
  <div>
    <el-menu
      :unique-opened="true"
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <menuTree :data="menus"></menuTree>
    </el-menu>
    <input
      class="input-common"
      v-validate="{ required: '必须', positive: 'positive' }"
    />
    <el-button type="success" @click="change1()">浅色</el-button>
    <el-button type="info" @click="change2()">深色</el-button>
  </div>
</template>

<script>
import menuTree from "@/components/layout/menuTree";
export default {
  data() {
    return {
      message: "hello!",
      menus: [
        {
          name: "菜单1",
          children: [
            {
              name: "菜单1-1",
            },
            {
              name: "菜单1-2",
            },
            {
              name: "菜单1-3",
              children: [
                {
                  name: "菜单1-3-1",
                },
                {
                  name: "菜单1-3-2",
                },
              ],
            },
          ],
        },
        {
          name: "菜单2",
          children: [
            {
              name: "菜单2-1",
            },
            {
              name: "菜单2-2",
              children: [
                {
                  name: "菜单2-2-1",
                },
                {
                  name: "菜单2-2-2",
                },
              ],
            },
            {
              name: "菜单2-3",
              children: [
                {
                  name: "菜单2-3-1",
                },
                {
                  name: "菜单2-3-2",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change1: function () {
      document.getElementById("app").className = "light-theme";
    },
    change2: function () {
      document.getElementById("app").className = "drak-theme";
    },
  },
  components: {
    menuTree,
  },
};
</script>
<style lang="scss">
// @import url(~@/views/less/element-variables.scss);
@import ".~@/views/less/element-variables";
// $--color-primary: red;
.el-button--success {
  background-color: $--color-primary !important;
}
</style>
