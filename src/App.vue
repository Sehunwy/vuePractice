<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import './views/less/theme.less';
export default {
  mounted() {
    this.$nextTick(() => {
      document.getElementById("app").className = "drak-theme";
    });
  },
};
</script>

<style lang="less">
// @import url(~@/views/less/common.css);
// @import url(~@/views/less/common.less);
// .light-theme {
//    --themeColor:#000;
// }

// .drak-theme {
//   --themeColor:pink;
// }

body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.bg-wrap-outer {
  background-color: var(--bgouter);
}

div,
p,
table,
tr,
td,
form,
ul,
ol,
dl,
li,
p,
h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  padding: 0;
}
</style>
