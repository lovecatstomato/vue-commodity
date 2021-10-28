<template>
  <div class="chart">
    <h2>图表示例</h2>

    <div ref="demo" style="height: 300px"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  mounted() {
    // 初始化 echarts 实例
    let myEchart = echarts.init(this.$refs.demo);

    // 绘制图表
    myEchart.setOption({
      title: {
        // 标题
        text: "用户分布", // 主标题文本
        left: "center",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          data: [
            { name: "北京", value: 300 },
            { name: "上海", value: 150 },
            { name: "深圳", value: 200 },
            { name: "杭州", value: 78 },
            { name: "其他", value: 700 },
          ],
        },
      ],
    });
  },
};
</script>

<style lang="less" scoped>
.chart{
    text-align: center;
}
</style>