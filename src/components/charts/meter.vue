<template>
  <div ref="dom" class="charts chart-meter"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartMeter',
  props: {
    text: String,
    rateAudit: Number,
    rateRelease: Number,
    sign: String
  },
  data () {
    return {
      dom: null,
      meterData: 0,
      isRequested: false
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    },
    showMessage: function () {
      this.$emit('showRequested', this.isRequested);
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.sign === 'rateAudit') {
        this.meterData = this.rateAudit;
      } else {
        this.meterData = this.rateRelease;
      }
      let option = {
        backgroundColor: '#11264f',
        title: {
          show: true,
          y: 'top',
          top: 20,
          left: 30,
          text: this.text,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 18,
            color: '#ffffff'
          },
          subtext: this.meterData + '%',
          subtextStyle: {
            color: '#33ffff',
            fontSize: 15
          }
        },
        tooltip: {
          show: true,
          backgroundColor: '#101E44',
          extraCssText: 'width:auto;height:auto;box-shadow: 0 0 3px #fff;',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle: {
            color: 'fff'
          },
          formatter: function (param) {
            return '<em style="color:#ffffff;">' + '比率: ' + param.value + '%</em> ';
          }
        },
        series: [{
          name: '白色圈刻度',
          type: 'gauge',
          radius: '100%',
          center: ['50%', '80%'],
          startAngle: 180, // 刻度起始
          endAngle: 0, // 刻度结束
          z: 4,
          axisTick: { show: false },
          splitLine: {
            length: 16, // 刻度节点线长度
            lineStyle: { width: 2, color: 'rgba(0,0,0, 0.9)' }// 刻度节点线
          },
          axisLabel: { color: '#', fontSize: 12 }, // 刻度节点文字颜色
          pointer: { show: false },
          axisLine: {
            lineStyle: { opacity: 0 }
          },
          detail: { show: false }
        }, {
          name: '灰色内圈', // 刻度背景
          type: 'gauge',
          z: 2,
          radius: '100%',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '80%'], // 整体的位置设置
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              color: [[1, 'rgba(51, 255, 255, 0.9)']], width: 15, opacity: 1// 刻度背景宽度
            }
          },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          axisTick: { show: false },
          detail: { show: 0 }
        }, {
          name: '指针',
          type: 'gauge',
          z: 6,
          radius: '100%',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '80%'], // 整体的位置设置
          axisLine: {
            lineStyle: {// 属性lineStyle控制线条样式//指针颜色
              color: [[1, '#33ffff']], width: 0
            }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          data: [this.meterData], // 指针位置
          pointer: { show: true, width: 5, length: '55%' },
          detail: { show: 0 }
        }, {
          name: '外层盘',
          type: 'gauge',
          z: 6,
          radius: '110%',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '80%'], // 整体的位置设置
          axisLine: {
            lineStyle: { // 属性lineStyle控制线条样式//控制外圈位置
              color: [[this.meterData, '#33ffff'], [1, 'rgba(255, 255, 255, 0.2)']], width: 5, opacity: 0.9// 控制外圈位置，颜色，宽度，透明度
            }
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          detail: { show: 0 }
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
