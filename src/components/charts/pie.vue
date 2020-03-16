<template>
  <div ref="dom" class="charts chart-pie"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
import 'echarts-liquidfill/src/liquidFill.js'; // 在这里引入
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartPie',
  props: {
    value_1: Array,
    value_2: Array,
    value: Array,
    text: String,
    name_1: String,
    name_2: String
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
      let legend = this.valueData.map(_ => _.name);
      let option = {
        title: {
          text: this.text,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: '14%',
          data: legend,
          textStyle: {
            color: [],
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 10
          }
        },
        color: ['#febc0a', '#0dfa12', 'fa1fc4', '#15bffe', '#66fd83',
          '#4ac7f5', '#14A4ED'],
        series: [
          {
            type: 'liquidFill',
            name: '',
            data: [ 0.55 ],
            radius: '30%',
            color: [ '#53d5ff' ], // 水波的颜色 对应的是data里面值
            center: ['50%', '61%'],
            label: {
              show: false
            },
            outline: {
              show: false
            }
          },
          {
            name: this.name_1,
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '61%'],
            data: this.value_1Data,
            label: {
              formatter: ' {a}: {d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            name: this.name_2,
            type: 'pie',
            selectedMode: 'single',
            radius: ['50', '40%'],
            center: ['50%', '61%'],
            label: {
              show: false
            },
            data: this.value_2Data
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  computed: {
    value_1Data: function () {
      return this.value_1; // 直接监听props里的value_1状态
    },
    value_2Data: function () {
      return this.value_2; // 直接监听props里的value_2状态
    },
    valueData: function () {
      return this.value; // 直接监听props里的value状态
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
