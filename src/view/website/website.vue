<template>
  <div class="website">
    <header-bar @aboutUs="aboutUs" @changeLangue="changeLangue" @dealPlan="dealPlan"
                @productCenter="productCenter" @calssicCase="calssicCase" @partner="partner" @culture="culture"/>
<!--    <div class="container">
      <img src="@/assets/images/zkbc.jpg" class="titleImg"/>
      <div class="container-part">
        <div class="title-part" @click="">English</div>
        <div class="title-part" @click="">解决方案</div>
        <div class="title-part" @click="">产品中心</div>
        <div class="title-part" @click="">典型案例</div>
        <div class="title-part" @click="">合作伙伴</div>
        <div class="title-part" @click="">企业文化</div>
        <div class="title-part" @click="toAbout">关于我们</div>
      </div>
    </div>-->
    <div @mouseenter="stop" @mouseleave="go">
      <ul>
        <!--<li @click="goPage(prevIndex)" class="left"><</li>-->
        <img :src="dataList[currentIndex]" />
        <div class="point">
          <li v-for="(item, index) in dataList" @click="goPage(index)" :class="{'current': currentIndex == index}">{{index + 1}}</li>
        </div>
        <!--<li @click="goPage(nextIndex)" class="left">></li>-->
      </ul>
    </div>
    <div class="introduce">
      <div class="introduce-left">
        <p class="intro-title">公司简介</p>
        <p class="intro-part">中科柏诚——全球领先的金融科技系统解决方案服务商，总部位于北京，服务对象涵盖银行、保险、信托、小贷、国企及上市集团企业等。公司产品包括联合放贷平台、消费金融系统、互联网核心技术、区块链技术等，旨在为客户提供互联网金融系统综合解决方案。公司以优质的服务，成熟的技术，多年的金融科技服务经验，占据了行业的领先地位。</p>
        <p class="intro-part">公司自成立以来获得国家高新技术企业认证、双软企业认证、ISO9001认证；获得各类奖项、证书数十项；被相关主管机构、行业协会吸纳为会员单位。公司核心团队是由资深金融人士、IT人士、互联网专业人士构成，骨干团队均具备丰富的海内外金融业、监管机构、国企、上市公司等从业背景。公司以专业的技术，卓越的体系，多年的行业经验，为客户提供更加优质的服务。</p>
        <button class="btn" @click="toAbout">查看更多</button>
      </div>
      <div class="introduce-right">
        <img src="@/assets/images/intro.jpg" />
      </div>
    </div>
    <div class="content">
      <div class="content-part">
        <div style="text-align: center;margin: 20px;">
          <img src="@/assets/images/deal.png"/>
        </div>
        <p>解决方案</p>
        <div style="text-align: center">
          <button>查看更多</button>
        </div>
      </div>
    </div>
    <!--<div class="footer-part">
      <div class="footer-part-top">
        <div class="footer-part-top-left">
          <img src="@/assets/images/zkbc.jpg"/>
        </div>
        <div class="footer-part-top-right">
          <p>地址：北京市朝阳区朝外大街乙6号朝外SOHO A座1807</p>
          <p>电话：010-85989984</p>
        </div>
      </div>
    </div>
    <div class="footer-part-bottom">
      <p>中科柏诚科技（北京）股份有限公司 京ICP备13020903号-3 京公网安备11010502024523</p>
    </div>-->
    <footer-part></footer-part>
  </div>
</template>

<script>
export default {
  name: 'website',
  data () {
    return {
      dataList: [
        'https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg',
        'https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg',
        'https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg'
      ],
      currentIndex: 0, // 默认为第一张
      timer: ''
    };
  },
  mounted () {
    // 定时器
    this.timer = setInterval(() => {
      this.goPage(this.nextIndex);
    }, 5000);
    this.init();
  },
  methods: {
    init () {

    },
    goPage (index) {
      this.currentIndex = index;
    },
    stop () {
      clearInterval(this.timer);
      this.timer = null;
    },
    go () {
      this.timer = setInterval(() => {
        this.goPage(this.nextIndex);
      }, 5000);
    },
    toAbout () {
      this.$router.push({
        path: '/about-us'
      });
    },
    aboutUs () {
      this.$router.push({
        path: '/about-us'
      });
    },
    changeLangue () {
      this.$router.push({
        path: '/about-us'
      });
    },
    dealPlan () {
      this.$router.push({
        path: '/solution'
      });
    },
    productCenter () {
      this.$router.push({
        path: '/product-center'
      });
    },
    calssicCase () {
      this.$router.push({
        path: '/classic-case'
      });
    },
    partner () {
      this.$router.push({
        path: '/partner'
      });
    },
    culture () {
      this.$router.push({
        path: '/culture'
      });
    }
  },
  computed: {
    // 上一张
    prevIndex () {
      if (this.currentIndex === 0) {
        return this.dataList.length - 1;
      } else {
        return this.currentIndex - 1;
      }
    },
    // 下一张
    nextIndex () {
      if (this.currentIndex === this.dataList.length - 1) {
        return 0;
      } else {
        return this.currentIndex + 1;
      }
    }
  }
};
</script>

<style lang="less">
  @import "website";
</style>
