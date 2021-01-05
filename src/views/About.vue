<template>
  <div class="bg-wrap-outer" style="height: 100%">
    <form ref="form">
      <input
        class="input-common"
        value="www"
        v-validate="{ required: '必须', positive: 'positive' }"
      />
      <input
        class="input-common"
        v-validate="{ required: '必须', positive: 'positive' }"
      />
      <input
        class="input-common"
        v-validate="{ required: '必须', positive: 'positive' }"
      />
      <input
        class="input-common"
        v-validate="{ required: '必须', positive: 'positive' }"
      />
    </form>
    <button @click="submit()">提交</button>
    <el-button @click="centerDialogVisible = true">默认按钮</el-button>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerDialogVisible = true"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="inner"
      :visible.sync="innerDialogVisible"
      width="30%"
      center
    >
      <span>innerDialogVisible</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-progress
      class="circle2"
      type="circle"
      :percentage="percentage"
    ></el-progress>
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="decrease"></el-button>
        <el-button icon="el-icon-plus" @click="increase"></el-button>
      </el-button-group>
    </div>

    <span style="position: absolute">
      <svg>
        <defs>
          <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style="stop-color: #32e8ff"
              stop-opacity="1"
            ></stop>
            <stop
              offset="100%"
              style="stop-color: #c832ff"
              stop-opacity="1"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </span>

    <div ref="echart" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import { hex_md5 } from "@/assets/md5";
// import echarts from "echarts";
import "@/views/js/theme";

export default {
  data() {
    return {
      centerDialogVisible: false,
      innerDialogVisible: false,
      percentage: 100,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  created() {
    console.log(this.doI18n("Getcaptcha"), this.doI18n("Getcaptcha1"));
  },
  mounted() {
    this.axios({
      method: "GET",
      url: "/oauth/token",
      params: {
        grant_type: "password",
        client_id: "manager",
        client_secret: "MCLdoqbydByzAbOC",
        username: "admin",
        password: "admin",
      },
    }).then((data) => {
      window.sessionStorage.setItem("token", data.value);
      console.log(data.value);
    });
    this.$nextTick(() => {
      var echarts = require("echarts");
      var echart = this.$refs.echart;
      var myChart = echarts.init(echart, "theme");

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "未来一周气温变化",
          subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["最高气温", "最低气温"],
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C",
          },
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
          },
          {
            name: "最低气温",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  methods: {
    submit: function () {
      var result = this.formValid(this.$refs.form);
      var token = window.sessionStorage.getItem("token");
      // axios.defaults.headers.common['Authorization'] = "bearer" + token;
      this.axios({
        method: "GET",
        url: "/api/store/fs/file/list",
        params: {
          path: "/",
          keyword: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
  },
};
</script>

<style >
.circle2 /deep/ svg > path:nth-child(2) {
  stroke: url(#write) !important;
}
.el-progress-circle__track {
  stroke: var(--progress-back-color) !important;
}
</style>
