<template>
  <div class="screen" v-if="exportAccess">
    <div class="title">
      <img src="@/assets/images/left.png" />
      <p>财360运营管理驾驶舱</p>
      <img src="@/assets/images/right.png"/>
    </div>
    <div class="container">
      <div class="content">
        <div class="contentTitle">
          <p class="label">累计撮合金额</p>
          <p class="num">{{loanApvamt}}万元</p>
        </div>
        <div class="contentTitle">
          <p class="label">累计余额</p>
          <p class="num">{{loanBal}}万元</p>
        </div>
        <div class="contentTitle">
          <p class="label">总用户数</p>
          <p class="num">{{user}}人</p>
        </div>
        <div class="contentTitle">
          <p class="dayLabel">当日撮合金额</p>
          <p class="num">{{dayLoanApvamt}}万元</p>
        </div>
        <div class="contentTitle">
          <p class="dayLabel">当日新增余额</p>
          <p class="num">{{dayLoanBal}}万元</p>
        </div>
        <div class="contentTitle">
          <p class="dayLabel">当日新增用户数</p>
          <p class="num">{{dayUser}}人</p>
        </div>
      </div>
      <div ref="lineBar" class="line-chart"></div>
      <div ref="pie_1" class="line-chart"></div>
      <div ref="pie_2" class="line-chart"></div>
      <div ref="bar" class="line-chart"></div>
      <div ref="pie_3" class="line-chart"></div>
      <div ref="pie_4" class="line-chart"></div>
      <div ref="pie_5" class="line-chart"></div>
    </div>
  </div>
 <!-- <div v-else><img src="@/assets/images/bgimg.jpg" style="width: 100%"/></div>-->
</template>

<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js'; // 引入中国地图数据
import { getPhoneEchartsData } from '@/api/data';
import { add_comma_toThousands, hasOneOf } from '@/libs/tools';
export default {
  name: 'phone-screen',
  data () {
    return {
      // 统计累计 今日
      loanApvamt: 0,
      loanBal: 0,
      user: 0,
      dayLoanApvamt: 0,
      dayLoanBal: 0,
      dayUser: 0,
      // 近半年累计放款及余额分析
      listBalanceXList: [],
      bankNoList: [],
      listBalanceLoanApvamt: [],
      listBalanceLoanBal: [],
      yearDataApvamt: [],
      yearDataLegend: [],
      // 资金方申请及放款
      listXBank: [],
      assetsBalance: [],
      assetsLoanapvamts: [],
      // 资产方放款占比
      channelPieX: [],
      channelPieY: [],
      // 通过率
      auditList: [],
      passNameList: [],
      // 件均统计
      jjList: [],
      jjNameList: [],
      // 资产方申请及放款
      apvResList: [],
      relResList: [],
      // 资产方逾期率统计(TOP3)
      overList: [],
      overYList: [],
      overXList: [],
      // 接受定时器
      timer: ''
    };
  },
  created () {
    this.$nextTick(() => {
      this.init();
    });
  },
  mounted () {
    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.init();
      }, 6000);
    }
  },
  methods: {
    init () {
      this.overList = [];
      this.overYList = [];
      this.overXList = [];
      this.jjList = [];
      this.jjNameList = [];
      this.passNameList = [];
      this.auditList = [];
      this.channelPieX = [];
      this.channelPieY = [];
      this.apvResList = [];
      this.relResList = [];
      this.listXBank = [];
      this.assetsBalance = [];
      this.assetsLoanapvamts = [];
      this.listBalanceXList = [];
      this.bankNoList = [];
      this.listBalanceLoanApvamt = [];
      this.listBalanceLoanBal = [];
      this.yearDataApvamt = [];
      this.yearDataLegend = [];
      getPhoneEchartsData().then(res => {
        // 累计统计
        if (res.data.loanRes) {
          let loanRes = res.data.loanRes;
          this.loanApvamt = add_comma_toThousands(((loanRes.loanApvamt ? loanRes.loanApvamt : 0) / 10000).toFixed(2));
          this.loanBal = add_comma_toThousands(((loanRes.loanBal ? loanRes.loanBal : 0) / 10000).toFixed(2));
          this.user = add_comma_toThousands(parseInt(loanRes.user ? loanRes.user : 0));
        }
        // 当日统计
        if (res.data.loanResCur) {
          let loanResCur = res.data.loanResCur;
          this.dayLoanApvamt = add_comma_toThousands(((loanResCur.releaseAmt ? loanResCur.releaseAmt : 0) / 10000).toFixed(2));
          this.dayLoanBal = add_comma_toThousands(((loanResCur.loanBals ? loanResCur.loanBals : 0) / 10000).toFixed(2));
          this.dayUser = add_comma_toThousands(parseInt(loanResCur.curuser ? loanResCur.curuser : 0));
        }
        // 近半年累计放款及余额分析
        if (res.data.listBalance.length > 0) {
          this.listBalance = res.data.listBalance;
          for (let items of (this.listBalance).reverse()) {
            items.loanBal = (items.loanBal / 100000000).toFixed(2);
            this.listBalanceXList.push(items.tradeDate);
            this.listBalanceLoanBal.push(items.loanBal);
          }
        }
        if (res.data.listLoanApvAmtByBankNo.length > 0) {
          this.listLoanApvAmtByBankNo = res.data.listLoanApvAmtByBankNo;
          for (let items of this.listLoanApvAmtByBankNo) {
            this.bankNoList.push(items.bankNo);
            let temp = [];
            for (let item of (items.yearData).reverse()) {
              item.loanApvamt = (item.loanApvamt / 100000000).toFixed(2);
              temp.push(item.loanApvamt);
            }
            this.yearDataApvamt.push({ bankNo: items.bankNo, yearData: temp });
          }
        }
        // 资金方放款和金额
        if (res.data.listbank.length > 0) {
          for (let item of res.data.listbank) {
            item.balance = (item.balance / 100000000).toFixed(2);
            item.loanapvamts = (item.loanapvamts / 100000000).toFixed(2);
            this.listXBank.push(item.bankNo);
            this.assetsBalance.push(item.balance);
            this.assetsLoanapvamts.push(item.loanapvamts);
          }
        }
        // 资产方放款占比   资金方放款和金额
        if (res.data.channelCount.length > 0) {
          for (let item of (res.data.channelCount).reverse()) {
            item.balances = (item.balances / 100000000).toFixed(2);
            item.releaseAmt = (item.releaseAmt / 100000000).toFixed(2);
            this.channelPieX.push(item.channelName);
            this.channelPieY.push({ name: item.channelName, value: item.releaseAmt });
            this.apvResList.push(item.balances);
            this.relResList.push(item.releaseAmt);
          }
        }
        // 件均
        if (res.data.jjamt.length > 0) {
          for (let item of (res.data.jjamt).reverse()) {
            item.jjAmt = (item.jjAmt / 1000).toFixed(2);
            if (item.jjAmt !== '0.00') {
              this.jjList.push(item.jjAmt);
              this.jjNameList.push(item.channelName);
            }
          }
        }
        // 通过率
        if (res.data.auditRadio.length > 0) {
          for (let item of (res.data.auditRadio).reverse()) {
            item.ttl = (item.ttl * 100).toFixed(2);
            this.passNameList.push(item.channelName);
            this.auditList.push(item.ttl);
          }
        }
        // 资产方逾期率统计
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
      let lineBar = echarts.init(this.$refs.lineBar); // 近半年累计放款及余额分析
      let pie_1 = echarts.init(this.$refs.pie_1); // 资金方放款和金额柱状图
      let pie_2 = echarts.init(this.$refs.pie_2); // 资产方放款和金额水平柱状
      let bar = echarts.init(this.$refs.bar); // 资产方放款占比
      let pie_3 = echarts.init(this.$refs.pie_3); // 产方件均
      let pie_4 = echarts.init(this.$refs.pie_4); // 资产方通过率
      let pie_5 = echarts.init(this.$refs.pie_5); // 逾期率
      /* 折线图数据 */
      let yearSeries = [];
      let yearColor = ['#67C8E3', '#7E63C2', '#7CE67C', '#EDD668', '#56E1FE', 'rgba(0,191,183,1)', 'rgba(255,144,128,1)'];
      for (let [index, item] of this.yearDataApvamt.entries()) {
        let itemSeries = {
          name: '',
          type: 'bar',
          stack: '总量',
          barWidth: 50,
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#F657B4',
              label: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter: function (p) {
                  return p.value > 0 ? (p.value) : '';
                }
              }
            }
          },
          data: ''
        };
        itemSeries.itemStyle.normal.color = yearColor[index];
        itemSeries.name = item.bankNo;
        itemSeries.data = item.yearData;
        yearSeries.push(itemSeries);
      }
      let a = yearSeries.length - 1;
      yearSeries[a].itemStyle.normal.position = 'top';
      let lastYear = {
        name: '累计放款',
        type: 'line',
        symbolSize: 10,
        symbol: 'circle',
        barWidth: 50,
        itemStyle: {
          normal: {
            color: '#F657B4',
            barBorderRadius: 0,
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              position: 'top',
              formatter: function (p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },
        data: this.listBalanceLoanBal
      };
      yearSeries.push(lastYear);
      lineBar.setOption({
        title: [
          {
            text: '近半年累计放款及余额分析',
            left: '60',
            top: '21',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30',
              fontFamily: 'Alibaba PuHuiTi',
              fontWeight: 400
            }
          },
          {
            text: '单位：亿元',
            left: '60',
            top: '69',
            textStyle: {
              color: '#A3A7BF',
              fontSize: '18'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 50,
          top: 128,
          left: 70,
          bottom: 78,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          right: '125',
          top: '82',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          icon: 'react',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 5,
          data: this.bankNoList
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#A3A7BF'
            }
          },
          axisLabel: {
            interval: 0,
            formatter: {},
            textStyle: {
              color: '#CED4F2',
              fontSize: 16
            }
            // margin: 40, //刻度标签与轴线之间的距离。
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          data: this.listBalanceXList
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#A3A7BF'
            },
            textStyle: {
              color: '#CED4F2',
              fontSize: 16
            }
          },
          axisLabel: {
            interval: 0,
            formatter: {},
            textStyle: {
              color: '#CED4F2',
              fontSize: '14'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          }
        }],
        series: yearSeries
      });
      pie_1.setOption({
        title: [
          {
            text: '资金方放款和余额',
            left: '60',
            top: '22',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30',
              fontFamily: 'Alibaba PuHuiTi',
              fontWeight: 400
            }
          },
          {
            text: '单位：亿元',
            left: '60',
            top: '77',
            textStyle: {
              color: '#A3A7BF',
              fontSize: '18'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          borderWidth: 50,
          top: 128,
          left: 70,
          bottom: 78,
          textStyle: {
            color: '#CED4F2'
          }
        },
        legend: {
          top: '34',
          right: '34',
          data: ['累计放款', '在贷余额'],
          icon: 'react',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 5,
          textStyle: {
            color: '#A3A7BF',
            fontSize: '20'
          }
        },
        xAxis: { // x轴
          type: 'category',
          data: this.listXBank,
          axisLabel: {
            interval: 0,
            formatter: {},
            textStyle: {
              color: '#CED4F2',
              fontSize: 16
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#CED4F2',
              fontSize: 16
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '累计放款',
            type: 'bar', // 蓝色数据
            barWidth: 45,
            data: this.assetsLoanapvamts,
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{ // 柱子颜色
                  offset: 0, color: '#3eaee5' // 100% 处的颜色
                }, {
                  offset: 1, color: '#53daf5' // 0% 处的颜色
                }]
              }
            }
          },
          {
            name: '在贷余额',
            type: 'bar',
            barWidth: 45,
            data: this.assetsBalance,
            itemStyle: {
              barBorderRadius: 10,
              color: '#FFCE54'
              /* color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#FF5624' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255, 86, 36, 0.2)' // 100% 处的颜色
                }]
              } */
            }
          }
        ]
      });
      pie_2.setOption({
        title: [
          {
            text: '资产方放款和余额',
            top: '22',
            left: '60',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30',
              fontFamily: 'Alibaba PuHuiTi',
              fontWeight: 400
            }
          },
          {
            subtext: '单位（亿元）',
            top: '22',
            left: '320',
            subtextStyle: {
              fontSize: 18,
              color: '#A3A7BF'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '33',
          right: '34',
          data: ['放款金额', '在贷余额'],
          icon: 'react',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 5,
          textStyle: {
            color: '#A3A7BF',
            fontSize: '20'
          }
        },
        grid: {
          top: '90',
          left: '20',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          data: this.channelPieY,
          boundaryGap: [0, 0.01],
          position: 'top',
          axisLabel: {
            color: '#CED4F2', // x轴字颜色
            fontSize: 16
          },
          axisTick: {
            show: false // 去掉坐标轴刻度线
          },
          axisLine: {
            lineStyle: {
              color: '#A3A7BF'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.channelPieX,
          axisLabel: {
            color: '#CED4F2', // y轴颜色
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#A3A7BF'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '放款金额',
            type: 'bar',
            barWidth: 20, // 柱子宽度
            data: this.relResList,
            label: { // 柱子后面显示的数字
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: 'linear',
                y: 0,
                y2: 1,
                colorStops: [
                  { // 柱子颜色
                    offset: 0, color: '#53daf5' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: '#3eaee5' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            name: '在贷余额',
            type: 'bar',
            barWidth: 20, // 柱子宽度
            data: this.apvResList,
            label: { // 柱子后面显示的数字
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                barWidth: 33,
                color: '#e75261' // 柱子颜色
              }
            }
          }
        ]
      });
      // 饼状图数据
      let numTotal = 0;
      function assetBar (array, key) {
        let assetObj = {};
        for (let i = 0; i < array.length; i++) {
          assetObj[array[i][key]] = array[i];
          numTotal += parseFloat(array[i].value);
        }
        return assetObj;
      }
      let objData = assetBar(this.channelPieY, 'name');
      bar.setOption({
        color: ['#FFCE54', '#53CAF5', '#7E63C2', '#EE4B5A', '#9702FF', '#30E12E', '#FD8500', '#375CF3', '#1CEECB', '#E83821'],
        title: [
          {
            text: '资产方放款占比',
            left: '60',
            top: '22',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30',
              fontFamily: 'Alibaba PuHuiTi',
              fontWeight: 400
            }
          },
          {
            text: '资产方',
            x: 'center',
            top: '38%',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30'
            }
          }
        ],
        legend: {
          orient: 'horizontal',
          top: '75%',
          textStyle: {
            color: '#CED4F2',
            fontSize: 16
          },
          icon: 'react',
          itemWidth: 10, // 图例显示颜色大小
          itemHeight: 10,
          itemGap: 37, // 每个item之间的距离
          formatter: function (name) {
            return name + '    ' + ((objData[name].value / numTotal) * 100).toFixed(2) + ' %';
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} {a}: {c} ({d}%)'
        },
        series: [
          {
            name: '资产方放款占比',
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['50%', '40%'],
            z: 10,
            label: {
              normal: {
                show: false,
                formatter: '{d}%',
                textStyle: {
                  fontSize: 16

                },
                position: 'outside'
              }
            }, // 延展线条样式
            data: this.channelPieY
          }
        ]
      });
      pie_3.setOption({
        title: [
          {
            top: '22',
            left: '60',
            text: '资产方件均',
            textStyle: {
              color: '#CED4F2',
              fontSize: '30',
              fontFamily: 'Alibaba PuHuiTi',
              fontWeight: 400
            }
          },
          {
            subtext: '单位（千元）',
            top: '22',
            left: '240',
            subtextStyle: {
              fontSize: 18,
              color: '#A3A7BF'
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {a}:{c}',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '20',
          top: '90',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          position: 'top',
          axisLabel: {
            color: '#CED4F2', // x轴字颜色
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.jjNameList,
          axisLabel: {
            color: '#CED4F2', // y轴颜色
            fontSize: 16
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '资产方件均',
            type: 'bar',
            data: this.jjList,
            label: { // 柱子后面显示的数字
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: '16'
                }
              }
            },
            barWidth: 30,
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: 'linear',
                y: 0,
                y2: 1,
                colorStops: [{ // 柱子颜色
                  offset: 0, color: '#53daf5' // 0% 处的颜色
                }, {
                  offset: 1, color: '#3eaee5' // 1000% 处的颜色
                }]
              }
            }
          }
        ]
      });
      pie_4.setOption({
        title: {
          top: '22',
          left: '60',
          text: '资产方通过率',
          textStyle: {
            color: '#CED4F2',
            fontSize: '30',
            fontFamily: 'Alibaba PuHuiTi',
            fontWeight: 400
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b} {a}:{c}%',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '20',
          top: '89',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          axisLabel: {
            formatter: function (value, index) {
              return value + '%';
            },
            color: '#CED4F2', // x轴字颜色
            fontSize: 16
          },
          axisTick: {
            show: false
          }, // 刻度线
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.passNameList,
          axisLabel: {
            color: '#CED4F2', // y轴字颜色
            fontSize: 16
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '资产方通过率',
            type: 'bar',
            data: this.auditList,
            label: { // 柱子后面显示的数字
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}%',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: '16'
                }
              }
            },
            barWidth: 30,
            itemStyle: {
              barBorderRadius: 10,
              color: '#FFCE54'
            }
          }
        ]
      });
      pie_5.setOption({
        title: {
          text: '逾期率',
          x: 'left',
          left: '60',
          top: '23',
          textStyle: {
            color: '#CED4F2',
            fontSize: '30',
            fontFamily: 'Alibaba PuHuiTi',
            fontWeight: 400
          }
        },
        grid: {
          left: '70',
          top: '130',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis', // 加这个会有阴影
          formatter: '{b} {a}:{c}%',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: this.overXList,
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#CED4F2',
              fontSize: '16'
            },
            margin: 10 // 刻度标签与轴线之间的距离。
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f9fdff',
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#A3A7BF',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter: '{value}%',
            textStyle: {
              color: '#CED4F2',
              fontSize: 16
            }
          }
        },
        series: [
          {
            name: '逾期率',
            type: 'bar',
            symbolSize: [0, 0],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            barWidth: 35, // 柱子宽度
            data: this.overYList,
            label: {// 柱子后面显示的数字
              normal: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                textStyle: {
                  color: '#FFFFFF',
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              barBorderRadius: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{ // 柱子颜色
                  offset: 0, color: '#3eaee5' // 100% 处的颜色
                }, {
                  offset: 1, color: '#53daf5' // 0% 处的颜色
                }]
              }
            }
          }
        ]
      });
    }
  },
  destroyed () {
    clearInterval(this.timer);
  },
  computed: {
    access () {
      return this.$store.state.user.access;
    },
    exportAccess () {
      return hasOneOf(['super_admin', 'phone-screen'], this.access);
    }
  }
};
</script>

<style lang="less">
  @import "screen";
</style>
