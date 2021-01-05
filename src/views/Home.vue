<template>
  <div class="home bg-wrap-outer" style="height: 100%">
    <el-tooltip class="item" effect="dark" placement="right">
      <div slot="content">
        　<span>1.所选的表必须设有主键，并且是单字段主键</span><br />
        　<span>2.必须保证主键长度至少19位</span>
      </div>
      <el-button>右边</el-button>
    </el-tooltip>
    home
    <form>
      <input
        class="input-common"
        v-validate="{ required: '必须', positive: 'positive' }"
      />
    </form>
    <div style="padding-top: 10px; padding-bottom: 10px">
      <textarea
        class="input-common"
        style="height: 100px"
        v-validate="{ required: '必须', positive: 'positive' }"
      ></textarea>
    </div>

    <el-checkbox v-model="checked">备选项</el-checkbox>
    <el-radio v-model="radio" label="1" disabled>备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="setCurrent(tableData[1])"
        >选中第二行</el-button
      >
      <el-button type="success" @click="change1()">浅色</el-button>
      <el-button type="info" @click="change2()">深色</el-button>
      <el-button type="warning">warning</el-button>
      <!-- <el-button
        type="warning"
        @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      > -->
      <el-button type="danger" @click="show3 = !show3">危险按钮</el-button>
    </el-row>
    <el-collapse-transition>
      <div v-show="show3">
        <div class="transition-box">el-collapse-transition</div>
        <div class="transition-box">el-collapse-transition</div>
      </div>
    </el-collapse-transition>
    <div style="height: 40px"></div>
    <div style="padding-right: 20px">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        ref="singleTable"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left">
              <el-form-item label="商品名称">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.date }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column label="日期" width="100">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 40px"></div>
    <div style="padding-right: 20px">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="toggleSelection"
        ref="multipleTable"
      >
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left">
              <el-form-item label="商品名称">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.date }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column> -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="100">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">
            {{ scope.row.date }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :background="true"
      :pager-count="5"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="20"
      layout=" prev, slot, next, jumper,sizes,total"
      :total="400"
    >
      <span>1/4</span>
    </el-pagination>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      show3: true,
      tableData: [
        {
          date: "2020-05-03",
        },
        {
          date: "2020-05-13",
        },
        {
          date: "2020-05-13",
        },
        {
          date: "2020-05-13",
        },
      ],
      multipleSelection: [],
      checked: true,
      radio: "1",
    };
  },
  created() {
    console.log(this.doI18n("music", ["yi", "er", "san"]));
  },
  mounted() {
    this.$nextTick(() => {
      document.getElementById("app").className = "drak-theme";
    });
  },
  methods: {
    change1: function () {
      document.getElementById("app").className = "light-theme";
    },
    change2: function () {
      document.getElementById("app").className = "drak-theme";
    },
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSelectionChange(row) {
      console.log(row);
    },
    handleCurrentChange: function (row) {
      console.log(row);
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
  },
};
</script>

<style lang="less">
// @import url(~@/views/less/common.css);
// @--color-primary: #000;
.el-button--danger {
  // background-color: var(--color-primary);
  // &:extend(.drak-theme);
  background-color: @color-primary;
  // color: var(--color-normal);
}
</style>
