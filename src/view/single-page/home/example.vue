<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts';
import { on, off } from '@/libs/tools';
export default {
  name: 'serviceRequests',
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
    const option = {
      title: {
        text: '资金方数据统计'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['申请总件数', '放款总件数', '申请总金额', '放款总金额']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: ['闪银', '360借条', '黄河银行', '闪银2', '360借条2', '黄河银行2']
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#a2a2a2'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: '申请总件数',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210],
          lineStyle: {
            color: '#fd9c3e'
          },
          itemStyle: {
            normal: {
              color: '#fd9c3e'
            }
          }
        },
        {
          name: '放款总件数',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310],
          lineStyle: {
            color: '#2bf97d'
          },
          itemStyle: {
            normal: {
              color: '#2bf97d'
            }
          }
        },
        {
          name: '申请总金额',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410],
          lineStyle: {
            color: '#f71fe5'
          },
          itemStyle: {
            normal: {
              color: '#f71fe5'
            }
          }
        },
        {
          name: '放款总金额',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320],
          lineStyle: {
            color: '#3bbdf9'
          },
          itemStyle: {
            normal: {
              color: '#3bbdf9'
            }
          }
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
