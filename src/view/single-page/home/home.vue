<template>
  <div class="home" v-if="exportAccess || this.userName === 'admin'">
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card shadow>
          <p class="tableTitle clearfix" style="margin-top: 0;">
            <Button @click="tableTy('0')" class="current">本日</Button>
            <Button @click="tableTy('1')">本月</Button>
            <Button @click="tableTy('2')">全部</Button>
          </p>
          <P class="pieTitle earthTitle">全国借款分布图</P>
          <div ref="earthChart" style="margin: 0 auto; background-color: #0d194e; height: 500px;" ></div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow class="clearfix">
          <p class="homeBtn">
            <Button @click.native="toChange('amount')" :class="{'Amount': isAmount}">数量</Button>
            <Button type="primary" @click.native="toChange('count')" :class="{ 'Count': isCount}">金额</Button>
          </p>
          <div ref="top_1" style="height: 425px;"></div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <div ref="top_2"  style="height: 450px;"></div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <div ref="sexPie" style="height: 350px;"></div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <div ref="agePie"  style="height: 350px;"></div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <P class="pieTitle">资产方申请及放款件数统计</P>
          <div style="height: 350px;" ref="bar_1"></div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <P class="pieTitle">资产方申请及放款金额统计</P>
          <div style="height: 350px;" ref="bar_2"></div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <P class="pieTitle">资产方件均统计</P>
          <div style="height: 350px;" ref="bar_3"></div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="12" style="margin-bottom: 20px;">
        <Card shadow>
          <P class="pieTitle">资产方逾期率统计(TOP3)</P>
          <div style="height: 350px;" ref="bar_4"></div>
        </Card>
      </i-col>
    </Row>
  </div>
  <div v-else-if="!exportAccess">
    <img src="@/assets/images/bgimg.jpg"/>
  </div>
</template>

<script>
import echarts from 'echarts';
import $ from 'jquery';
import 'echarts/map/js/china.js'; // 引入中国地图数据
import { getEchartsData } from '@/api/data';
import { add_comma_toThousands, hasOneOf } from '@/libs/tools';
import { getStore } from '@/libs/storage';
export default {
  name: 'home',
  data () {
    return {
      isAmount: false,
      isCount: false,
      bar_1_title: '按产品统计放款金额',
      bar_1_unit: '单位：万元',
      channelData: [],
      earthData: [],
      applyCountData: [],
      loanCountData: [],
      applyAmountData: [],
      loanAmountData: [],
      maxArrangeData: [],
      maxArrange: 200,
      tableData_1: [],
      barTopData: [],
      barTopYAxisData: [],
      // 接收定时器
      timer: '',
      rateRelease: 0,
      earthLoanAmount: 0,
      earthLoanCount: 0,
      addPerson: 0,
      earthText: '今日',
      dimension: '0',
      channelCountList: [],
      numStatisticsData: [],
      sexList: [
        { sex: 'boys', count: 0 },
        { sex: 'girls', count: 0 }
      ],
      ageList: [
        { name: '18-22年龄段', value: 0 },
        { name: '23-30年龄段', value: 0 },
        { name: '31-45年龄段', value: 0 },
        { name: '45-60年龄段', value: 0 }
      ],
      productList: [],
      productXList: [],
      productYList: [],
      overList: [],
      overYList: [],
      overXList: [],
      BlockData: [],
      insideScatterData: [],
      userName: ''
    };
  },
  created () {
    this.$nextTick(() => {
      this.userName = getStore('userName');
      console.log(this.userName);
      this.init(this.dimension);
    });
  },
  mounted () {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.init(this.dimension);
      }, 100000);
    }
  },
  methods: {
    tableTy (param) {
      $('.ivu-btn').removeClass('current');
      $('.tableTitle .ivu-btn').eq(param).addClass('current');
      if (param === '1') {
        this.earthText = '本月';
        this.dimension = '1';
      } else if (param === '2') {
        this.earthText = '累计';
        this.dimension = '2';
      } else {
        this.earthText = '今日';
        this.dimension = '0';
      }
      this.init(this.dimension);
    },
    init (params) {
      this.BlockData = [];
      this.productXList = [];
      this.productYList = [];
      this.productList = [];
      this.ageList = [
        { name: '18-22年龄段', value: 0 },
        { name: '23-30年龄段', value: 0 },
        { name: '31-45年龄段', value: 0 },
        { name: '45-60年龄段', value: 0 }
      ];
      this.sexList = [
        { sex: 'boys', count: 0 },
        { sex: 'girls', count: 0 }
      ];
      this.numStatisticsData = [];
      this.channelCountList = [];
      this.loanCountData = [];
      this.applyCountData = [];
      this.applyAmountData = [];
      this.loanAmountData = [];
      this.channelData = [];
      this.tableData_1 = [];
      this.barTopData = [];
      this.barTopYAxisData = [];
      this.insideScatterData = [];
      this.earthData = [];
      this.overList = [];
      this.overXList = [];
      this.overYList = [];
      this.earthLoanAmount = 0;
      this.earthLoanCount = 0;
      this.loanBals = 0;
      this.addPerson = 0;
      this.rateRelease = 0;
      getEchartsData({ dimension: params }).then(res => {
        // 地图 放款统计值
        if (JSON.stringify(res.data.loanStatis) !== '{}' && res.data.loanStatis !== null) {
          this.earthLoanAmount = add_comma_toThousands((parseFloat(res.data.loanStatis.releaseAmt ? res.data.loanStatis.releaseAmt : 0) / 10000).toFixed(2));
          this.earthLoanCount = add_comma_toThousands(res.data.loanStatis.releaseCount ? res.data.loanStatis.releaseCount : 0);
          this.loanBals = add_comma_toThousands((parseFloat(res.data.loanStatis.loanBals ? res.data.loanStatis.loanBals : 0) / 10000).toFixed(2));
          this.addPerson = res.data.user ? parseInt(res.data.user) : 0;
          this.rateRelease = res.data.loanStatis.bl ? ((res.data.loanStatis.bl * 100).toFixed(2)) : 0;
        }
        // 地图值
        if (res.data.users.length > 0) {
          for (let items of res.data.users) {
            this.maxArrangeData.push(items.value);
            items.applyAmt = (items.applyAmt / 10000).toFixed(2);
            items.releaseAmt = (items.releaseAmt / 10000).toFixed(2);
            this.earthData.push(items);
            this.barTopYAxisData.push(items.name);
            this.barTopData.push(items.releaseAmt);
          }
          this.maxArrange = Math.max(...this.maxArrangeData);
        }
        // 性别图 // 年龄图
        if (res.data.ageList.length > 0 && res.data.ageList[0] !== null) {
          this.sexList[0].count = parseFloat(res.data.ageList[0].boys);
          this.sexList[1].count = parseFloat(res.data.ageList[0].girls);
          this.ageList[0].value = parseFloat(res.data.ageList[0]['18-22']);
          this.ageList[1].value = parseFloat(res.data.ageList[0]['23-30']);
          this.ageList[2].value = parseFloat(res.data.ageList[0]['31-45']);
          this.ageList[3].value = parseFloat(res.data.ageList[0]['45-60']);
        }
        // 全国放款金额分布TOP10
        let bigData = 0;
        if (this.barTopData.length >= 10) {
          this.barTopData = this.barTopData.slice(0, 10).reverse();
          this.barTopYAxisData = this.barTopYAxisData.slice(0, 10).reverse();
          bigData = parseFloat(this.barTopData[9]) + parseFloat(this.barTopData[8]);
        } else {
          this.barTopData = this.barTopData.reverse();
          this.barTopYAxisData = this.barTopYAxisData.reverse();
          bigData = parseFloat(this.barTopData[this.barTopData.length - 2] ? this.barTopData[this.barTopData.length - 2] : this.barTopData[this.barTopData.length - 1]) + parseFloat(this.barTopData[this.barTopData.length - 1]) * 2;
        }
        for (let i = 0; i < this.barTopData.length; i++) {
          this.BlockData.push(bigData);
          this.insideScatterData.push(0);
        }
        // 全国借款分布图资产方TOP3 资产方申请及放款件数统计 资产方申请及放款金额统计 资产方件均统计
        if (res.data.channelCount.length > 0) {
          this.tableData_1 = res.data.channelCount;
          for (let item of this.tableData_1) {
            this.numStatisticsData.push(item.jjAmt);
            this.channelData.push(item.channelName);
            this.applyCountData.push(item.applyCount);
            this.loanCountData.push(item.releaseCount);
            this.applyAmountData.push((item.applyAmt / 10000).toFixed(2));
            this.loanAmountData.push((item.releaseAmt / 10000).toFixed(2));
            item.releaseAmt = add_comma_toThousands((item.releaseAmt / 10000).toFixed(2));
            this.channelCountList.push(item);
          }
        }
        // 按产品统计放款金额
        if (res.data.productList.length > 0) {
          this.productList = res.data.productList;
          for (let item of this.productList) {
            this.productXList.push(item.productName);
            this.productYList.push((item.relesAmt / 10000).toFixed(2));
          }
        }
        // 资产方逾期率统计(TOP3)
        if (res.data.overList.length > 0) {
          this.overList = res.data.overList;
          for (let item of this.overList) {
            this.overYList.push((item.over * 100).toFixed(2));
            this.overXList.push(item.channelName);
          }
        }
        this.draw();
      });
    },
    draw () {
      let earthEchart = echarts.init(this.$refs.earthChart); // 地区图
      let sexEchart_1 = echarts.init(this.$refs.sexPie); // 性别饼图
      let ageEchart_2 = echarts.init(this.$refs.agePie); // 年龄饼图
      let topEchart_1 = echarts.init(this.$refs.top_1); // top10
      let topEchart_2 = echarts.init(this.$refs.top_2); // top10
      let barEchart_1 = echarts.init(this.$refs.bar_1); // 柱状图1
      let barEchart_2 = echarts.init(this.$refs.bar_2); // 柱状图2
      let barEchart_3 = echarts.init(this.$refs.bar_3); // 柱状图3
      let barEchart_4 = echarts.init(this.$refs.bar_4); // 柱状图4
      let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
      topEchart_1.setOption({
        title: {
          text: this.bar_1_title,
          x: '3%',
          top: 0,
          textStyle: {
            color: '#333',
            fontSize: 19
          },
          subtext: this.bar_1_unit,
          subtextStyle: {
            color: '#333',
            fontSize: 13
          }
        },
        grid: {
          left: '4%',
          top: '18%',
          bottom: 5,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.productXList,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#063374',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#00c7ff'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#00c7ff',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#063374'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: this.productYList,
          barWidth: 25, // 柱子宽度
          // barGap: 1, // 柱子之间间距
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00fcae'
              }, {
                offset: 1,
                color: '#006388'
              }]),
              opacity: 1
            }
          }
        }]
      });
      topEchart_2.setOption({
        title: {
          text: '全国放款金额分布 Top10',
          x: '3%',
          top: 15,
          textStyle: {
            color: '#333',
            fontSize: 19
          },
          subtext: '单位：万元',
          subtextStyle: {
            color: '#333',
            fontSize: 13
          }
        },
        grid: {
          left: '5%',
          top: '18%',
          right: '4%',
          bottom: 0,
          containLabel: true
        },
        xAxis: [{
          show: false
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#333',
              fontSize: '13'
            }
          },
          data: this.barTopYAxisData
        }, {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#333',
              fontSize: '16'
            }
          },
          data: []
        }, {
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: []
        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: this.barTopData,
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#333',
                fontSize: '13',
                padding: [0, 0, 0, 10]
              }
            }
          },
          barWidth: 6,
          itemStyle: {
            normal: {
              color: function (params) {
                let num = myColor.length;
                return myColor[params.dataIndex % num];
              }
            }
          },
          z: 2
        },
        {
          name: '白框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: this.BlockData,
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#fff'
            }
          },
          z: 1
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: this.insideScatterData,
          yAxisIndex: 2,
          symbolSize: 22,
          itemStyle: {
            normal: {
              color: function (params) {
                let num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              opacity: 1
            }
          },
          z: 2
        }]
      });
      /* 获取地图数据 */
      let geoCoordMap = {};
      let mapFeatures = echarts.getMap('china').geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
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
      let earthLabel = ['资产方放款展示（前3）' + '\n'];
      if (this.channelCountList.length >= 3) {
        earthLabel.push(this.channelCountList[0].channelName + '：' + this.channelCountList[0].releaseAmt + '万元' + '\n');
        earthLabel.push(this.channelCountList[1].channelName + '：' + this.channelCountList[1].releaseAmt + '万元' + '\n');
        earthLabel.push(this.channelCountList[2].channelName + '：' + this.channelCountList[2].releaseAmt + '万元' + '\n');
      } else if (this.channelCountList.length > 0 && this.channelCountList.length < 3) {
        for (let item of this.channelCountList) {
          earthLabel.push(item.channelName + '：' + item.releaseAmt + '万元' + '\n');
        }
      } else {
        earthLabel.push(' 暂无' + '\n');
      }
      earthEchart.setOption({
        title: {
          show: true,
          y: 'top',
          left: 20,
          subtext: [
            '放款统计' + '\n',
            '放款金额(万元)：' + this.earthLoanAmount + '\n',
            '放款笔数(件)：' + this.earthLoanCount + '\n',
            '新增余额(万元)：' + this.loanBals + '\n',
            '放款比率：' + this.rateRelease + '%' + '\n',
            this.earthText + '新增用户：' + this.addPerson + '\n'
          ].join('\n'),
          subtextStyle: {
            color: '#fff',
            fontSize: 16
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
              res = params.data.name + '<br> ' + '放款件数(件)：' + params.data.value + '<br>' + ' 放款金额(万元): ' + add_comma_toThousands(params.data.releaseAmt);
            } else {
              res = '';
            }
            return res;
          }
        },
        visualMap: {
          min: 0,
          max: this.maxArrange,
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
        graphic: [
          {
            type: 'group',
            right: 10,
            bottom: 20,
            children: [
              {
                type: 'text',
                z: 100,
                style: {
                  fill: '#fff',
                  stroke: '#fff',
                  text: earthLabel.join('\n'),
                  font: '16px'
                }
              }
            ]
          }
        ],
        series: [{
          name: '散点',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(this.earthData),
          symbolSize: [5, 5],
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: '#31faf3'
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
          data: this.earthData
        },
        {
          name: '点',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin', // 气泡
          symbolSize: [40, 40],
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
          data: convertData(this.earthData)
        },
        {
          name: 'Top 3',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(this.earthData.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 3)),
          symbolSize: [10, 10],
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
              shadowBlur: 30,
              shadowColor: 'yellow'
            }
          },
          zlevel: 1
        }
        ]
      });
      let symbols = [
        'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
        'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z',
        'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z'
      ];
      let bodyMax = 1; // 指定图形界限的值
      let boys = this.sexList[0].count;
      let girls = this.sexList[1].count;
      let sexData = [];
      if (boys + girls !== 0) {
        bodyMax = boys + girls;
        boys = parseFloat(this.sexList[0].count);
        girls = parseFloat(this.sexList[1].count);
      }
      let style = {
        fontSize: 18,
        fontFamily: 'Arial',
        color: '#686868'
      };
      sexData.push({ value: boys + ' / ' + ((boys / bodyMax) * 100).toFixed(2) + ' %', textStyle: style });
      sexData.push({ value: '', textStyle: {} });
      sexData.push({ value: girls + ' / ' + ((girls / bodyMax) * 100).toFixed(2) + ' %', textStyle: style });
      sexEchart_1.setOption({
        title: {
          text: '借款人性别比例',
          x: '3%',
          textStyle: {
            color: '#333',
            fontSize: 19
          }
        },
        tooltip: {
          show: false // 鼠标放上去显示悬浮数据
        },
        grid: {
          top: '15%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          data: sexData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          max: bodyMax,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolClip: true,
          symbolBoundingData: bodyMax,
          data: [
            {
              value: boys,
              symbol: symbols[0],
              itemStyle: {
                normal: {
                  color: 'rgba(105,204,230)' // 单独控制颜色
                }
              }
            },
            {},
            {
              value: girls,
              symbol: symbols[1],
              itemStyle: {
                normal: {
                  color: 'rgba(255,130,130)' // 单独控制颜色
                }
              }
            }
          ],
          z: 10
        },
        {
          // 设置背景底色，不同的情况用这个
          name: 'full',
          type: 'pictorialBar', // 异型柱状图 图片、SVG PathData
          symbolBoundingData: bodyMax,
          animationDuration: 0,
          itemStyle: {
            normal: {
              color: '#ccc' // 设置全部颜色，统一设置
            }
          },
          z: 10,
          data: [
            {
              itemStyle: {
                normal: {
                  color: 'rgba(105,204,230,0.40)' // 单独控制颜色
                }
              },
              value: 100,
              symbol: symbols[0]
            },
            {
              // 设置中间冒号
              itemStyle: {
                normal: {
                  color: '#1DA1F2' // 单独控制颜色
                }
              },
              value: 100,
              symbol: symbols[2],
              symbolSize: [8, '18%'],
              symbolOffset: [0, '-200%']
            },
            {
              itemStyle: {
                normal: {
                  color: 'rgba(255,130,130,0.40)' // 单独控制颜色
                }
              },
              value: 100,
              symbol: symbols[1]
            }
          ]
        }
        ]
      });
      let ageImageUrl = 'data:image/png;base64,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';
      ageEchart_2.setOption({
        grid: {
          top: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        graphic: {
          elements: [{
            type: 'image',
            style: {
              image: ageImageUrl,
              width: 100,
              height: 100
            },
            left: 'center',
            top: '27%'
          }]
        },
        title: {
          text: '借款人年龄比例',
          left: 'center',
          top: '47%',
          padding: [24, 0],
          textStyle: {
            color: '#333',
            fontSize: 15,
            align: 'center'
          }
        },
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          bottom: 0,
          x: 'center',
          data: this.ageList.name,
          textStyle: {
            color: '#333'
          }
        },
        series: [{
          name: '年龄范围',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['48%', '55%'],
          center: ['50%', '42%'],
          color: ['#006495', '#1D5F84', '#255C6D', '#3C5C67', '#40486C', '#3F3C73', '#403D84', '#1F3A8D', '#0B3B77'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          tooltip: {
            show: false
          },
          data: [
            {
              value: 520,
              name: ''
            },
            {
              value: 170,
              name: ''
            },
            {
              value: 1500,
              name: ''
            },
            {
              value: 210,
              name: ''
            },
            {
              value: 750,
              name: ''
            }
          ]
        },
        {
          name: '人员类型',
          type: 'pie',
          radius: ['55%', '67%'],
          center: ['50%', '42%'],
          color: ['#00FFFF', '#44EAB1', '#7BDD43', '#FEBE12', '#EBEC2F', '#FF7C44', '#FA3E5F', '#6635EF', '#FFAFDA'],
          labelLine: {
            normal: {
              show: true,
              length: 10,
              length2: 10,
              lineStyle: {
                width: 2
              }
            }
          },
          label: {
            normal: {
              formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
              rich: {
                b: {
                  fontSize: 17,
                  color: '#12EABE',
                  align: 'left',
                  padding: 4
                },
                hr: {
                  borderColor: '#12EABE',
                  width: '100%',
                  borderWidth: 2,
                  height: 0
                },
                d: {
                  fontSize: 17,
                  color: '#333',
                  align: 'left',
                  padding: 4
                },
                c: {
                  fontSize: 17,
                  color: '#333',
                  align: 'left',
                  padding: 4
                }
              }
            }
          },
          data: this.ageList
        }]
      });
      barEchart_1.setOption({
        title: {
          text: '单位: 件',
          x: '10',
          y: '20',
          textStyle: {
            fontSize: 13,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          align: 'left',
          right: 10,
          textStyle: {
            color: '#333'
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.channelData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#063374',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#063374'
            }
          }
        }],
        series: [{
          name: '申请件数',
          type: 'bar',
          data: this.applyCountData,
          barWidth: 20, // 柱子宽度
          barGap: 1, // 柱子之间间距
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#96d668'
              }, {
                offset: 1,
                color: '#01babc'
              }]),
              barBorderRadius: 50,
              borderWidth: 0,
              opacity: 1
            }
          }
        }, {
          name: '放款件数',
          type: 'bar',
          data: this.loanCountData,
          barWidth: 20,
          barGap: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#1a98f8'
              }, {
                offset: 1,
                color: '#7049f0'
              }]),
              barBorderRadius: 50,
              borderWidth: 0,
              opacity: 1
            }
          }
        }]
      });
      barEchart_2.setOption({
        title: {
          text: '单位: 万元',
          x: '10',
          y: '20',
          textStyle: {
            fontSize: 13,
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          align: 'left',
          right: 10,
          textStyle: {
            color: '#333'
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 35
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.channelData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#063374',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              color: '#063374'
            }
          }
        }],
        series: [{
          name: '申请金额',
          type: 'bar',
          data: this.applyAmountData,
          barWidth: 20, // 柱子宽度
          barGap: 1, // 柱子之间间距
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fccb05'
              }, {
                offset: 1,
                color: '#f5804d'
              }]),
              barBorderRadius: 50,
              borderWidth: 0,
              opacity: 1
            }
          }
        }, {
          name: '放款金额',
          type: 'bar',
          data: this.loanAmountData,
          barWidth: 20,
          barGap: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#f7734e'
              }, {
                offset: 1,
                color: '#e12945'
              }]),
              barBorderRadius: 50,
              borderWidth: 0,
              opacity: 1
            }
          }
        }]
      });
      barEchart_3.setOption({
        title: {
          text: '单位: 元',
          x: '10',
          y: '20',
          textStyle: {
            fontSize: 13,
            color: '#333'
          }
        },
        color: ['#02a9ff'],
        tooltip: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.channelData,
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#333'
            },
            formatter: '{value}'
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisLine: {
            show: false
          }
        }],
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}',
              color: '#333'
            }
          },
          data: this.numStatisticsData
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, 5],
          z: 12,
          data: this.numStatisticsData
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '20',
          data: this.numStatisticsData
        }]
      });
      barEchart_4.setOption({
        title: {
          text: '单位: %',
          x: '10',
          y: '20',
          textStyle: {
            fontSize: 13,
            color: '#333'
          }
        },
        color: ['#9896ff'],
        tooltip: {
          formatter: '{b}: {c}%'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.overXList,
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#333'
            },
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            }
          },
          axisLine: {
            show: false
          }
        }],
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}%',
              color: '#333'
            }
          },
          data: this.overYList
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, 5],
          z: 12,
          data: this.overYList
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '20',
          data: this.overYList
        }]
      });
    },
    toChange (val) {
      this.productYList = [];
      if (val === 'count') {
        this.isCount = false;
        this.isAmount = false;
        this.bar_1_title = '按产品统计放款金额';
        this.bar_1_unit = '单位：万元';
        if (this.productList.length > 0) {
          for (let item of this.productList) {
            this.productYList.push((item.relesAmt / 10000).toFixed(2));
          }
        }
      } else {
        this.isCount = true;
        this.isAmount = true;
        this.bar_1_title = '按产品统计放款件数';
        this.bar_1_unit = '单位：件';
        if (this.productList.length > 0) {
          for (let item of this.productList) {
            this.productYList.push(item.relescount);
          }
        }
      }
      this.draw();
    }
  },
  computed: {
    access () {
      return this.$store.state.user.access;
    },
    exportAccess () {
      return hasOneOf(['super_admin', 'home'], this.access);
    }
  },
  destroyed () {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
  .count-style{
    font-size: 50px;
  }
  .left-area .iconfont {
     font-size: 35px !important;
  }
  @import "home";
</style>
