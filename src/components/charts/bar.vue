<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    this.$nextTick(() => {
      let xAxisData = Object.keys(this.value);
      let seriesData = Object.values(this.value);
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          subtextStyle: {
            fontSize: 13,
            align: 'left',
            x: 'left'
          },
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          show: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 14
          },
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          animation: false,
          barWidth: 4,
          data: seriesData,
          tooltip: {
            show: false
          },
          itemStyle: {
            color: '#ff8b5d'
          }
        },
        {
          type: 'scatter',
          data: seriesData,
          symbolSize: 8,
          itemStyle: {
            borderWidth: 0,
            opacity: 1,
            color: '#ff8b5d'
          }
        }]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
