<template>
  <div class="website">
    <header-bar @home="home" @dealPlan="dealPlan" @partner="partner" @aboutUs="aboutUs" />
    <div class="slide" @mouseover="stop()" @mouseout="move()">
      <div class="slideshow">
        <ul>
          <li @click="goPage(prevIndex)" class="left"><</li>
          <li v-for="(img, index) in dataList" v-show="index === mark" :key="index">
            <img :src='img'>
          </li>
          <li @click="goPage(nextIndex)" class="right">></li>
        </ul>
      </div>
      <div class="bar">
        <span v-for="(item, index) in dataList" :class="{ 'active':index === mark }" @click="change(index)" :key="index"></span>
      </div>
    </div>
    <div class="introduce">
      <div class="introduce-left">
        <img src="@/assets/images/intro.jpg" />
      </div>
      <div class="introduce-right">
        <p class="intro-title">公司信息</p>
        <p class="comInfo">Company information</p>
        <p class="intro-part">中科柏诚科技（北京）股份有限公司成立于2010年，总部位于北京中关村园区，是国高新和中关村高新双高新技术企业，是国内领先的金融科技与开放银行运营合作商。</p><br>
        <p class="intro-part">公司致力于为传统银行提供向开放银行转型升级过程中所需的资产类、负债类、支付类等，可覆盖贷前、贷中、贷后全流程的智能产品、技术和服务。通过IT系统能力输出、流量供应、风控服务、贷后服务、产品设计及运营服务能力，满足中小银行开放银行建设和运营过程中的各类个性化需求，协助其实现业务线上化、智能化转型。通过领先的科技技术，以及优质金融业务运营服务能力，为中小型银行进行科技赋能，有效降低运营成本、提升用户体验、提高服务水准，拓展业务渠道、增加收入。</p><br>
        <p class="intro-part">中科柏诚始终坚持以客户需求为中心，利用领先技术，优质的服务，为客户降低运营成本，提升各方协同效率。实现共建生态、科技赋能、合作共赢。</p>
        <button class="btn" @click="toAbout">查看更多</button>
      </div>
    </div>
    <div class="post">
      <img src="@/assets/images/Milepost.png"/>
    </div>
    <div class="content">
      <p class="title">解决方案</p>
      <p class="solution">Total Solution</p>
      <div class="solution-content">
        <div class="left">
          <div align="center">
            <img src="@/assets/images/1.jpg"/>
          </div>
          <p class="list-menu">营销获客</p>
          <div class="list-border"></div>
          <p class="list">智能营销</p>
          <p class="list">智能信贷</p>
          <p class="list">智能存款</p>
        </div>
        <div class="center">
          <div align="center">
            <img src="@/assets/images/2.jpg"/>
          </div>
          <p class="list-menu">数字中台</p>
          <div class="list-border"></div>
          <p class="list">智能营销</p>
          <p class="list">智能信贷</p>
          <p class="list">智能存款</p>
        </div>
        <div class="right">
          <div align="center">
            <img src="@/assets/images/3.jpg"/>
          </div>
          <p class="list-menu">场景金融</p>
          <div class="list-border"></div>
          <p class="list">智能营销</p>
          <p class="list">智能信贷</p>
          <p class="list">智能存款</p>
        </div>
      </div>
    </div>
    <footer-part></footer-part>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'website',
  data () {
    return {
      mark: 0, // 比对图片索引的变量
      dataList: [
        require('@/assets/images/a.jpg'),
        require('@/assets/images/b.jpg'),
        require('@/assets/images/c.jpg')
      ],
      currentIndex: 0, // 默认为第一张
      timer: ''
    };
  },
  created () {
    this.$nextTick(() => {
      this.play();
      $('.center').addClass('current');
    });
  },
  methods: {
    autoPlay () {
      this.mark++;
      if (this.mark === 3) { // 当遍历到最后一张图片置零
        this.mark = 0;
      }
    },
    play () {
      setInterval(this.autoPlay, 3000);
    },
    change (i) {
      this.mark = i;
    },
    stop () {
      clearInterval(this.timer);
    },
    move () {
      this.timer = setInterval(this.autoPlay, 3000);
    },
    goPage (index) {
      this.mark = index;
    },
    toAbout () {
      this.$router.push({
        path: '/about-us'
      });
    },
    home () {
      this.$router.push({
        path: '/website'
      });
    },
    dealPlan () {
      this.$router.push({
        path: '/solution'
      });
    },
    partner () {
      this.$router.push({
        path: '/partner'
      });
    },
    aboutUs () {
      this.$router.push({
        path: '/about-us'
      });
    }
  },
  computed: {
    // 上一张
    prevIndex () {
      if (this.mark === 0) {
        return this.dataList.length - 1;
      } else {
        return this.mark - 1;
      }
    },
    // 下一张
    nextIndex () {
      if (this.mark === this.dataList.length - 1) {
        return 0;
      } else {
        return this.mark + 1;
      }
    }
  }
};
</script>

<style lang="less">
  @import "website";
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
