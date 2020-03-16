<template>
  <div ref="dom" class="charts chart-map"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
import 'echarts/map/js/china.js'; // 引入中国地图数据
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartMap',
  props: {
    text: String,
    earthData: Array
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
      /* 获取地图数据 */
      let geoCoordMap = {};
      let mapFeatures = echarts.getMap('china').geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      let max = 480;
      let min = 9; // todo
      let maxSize4Pin = 100;
      let minSize4Pin = 20;
      let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let option = {
        title: {
          text: this.text,
          x: 'center',
          top: 15,
          textStyle: {
            color: '#fff',
            fontFamily: '等线',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,.8)',
          borderWidth: '2',
          extraCssText: 'width:auto;height:auto;box-shadow: 0 0 3px #fff;',
          show: true,
          formatter: function (params) {
            let res;
            if (params.value > 0) {
              res = params.data.name + '<br> ' + '放款件数(件)：' + params.data.value + '<br>' + ' 放款金额(元): ' + params.data.applyAmt;
            } else {
              res = '';
            }
            return res;
          }
        },
        visualMap: {
          min: 0,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 10
          },
          seriesIndex: [1],
          calculable: true,
          show: true,
          inRange: {
            color: ['#fcfe72', '#ffc188', '#479fd2', '#fba853', '#48c7c0', '#fa8737', '#4bbdd6', '#ff6f5b']
          }
        },
        geo: {
          map: 'china',
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              color: '#333'
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#fbfbfb',
              borderColor: '#fff'
            },
            emphasis: {
              areaColor: '#3574c8'
            }
          }
        },
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(this.earthDataTemp),
          symbolSize: '10',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75, // 长宽比
          showLegendSymbol: false, // 存在legend时显示
          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          },
          animation: false,
          data: this.earthDataTemp
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin', // 气泡
          symbolSize: function (val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min);
            var b = minSize4Pin - a * min;
            b = maxSize4Pin - a * max;
            return 0.25 * a * val[2] + b;
          },
          label: {
            normal: {
              show: true,
              formatter: function (param) {
                return param.value[2];
              },
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#f41328' // 标志颜色
            }
          },
          zlevel: 6,
          data: convertData(this.earthDataTemp)
        },
        {
          name: 'Top 3',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(this.earthDataTemp.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 3)),
          symbolSize: '15',
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              shadowBlur: 50,
              shadowColor: 'yellow'
            }
          },
          zlevel: 1
        }
        ]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  computed: {
    earthDataTemp: function () {
      return this.earthData; // 直接监听props里的earthData状态
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
