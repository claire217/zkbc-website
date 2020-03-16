<template>
  <div class="header-bar">
    <img src="@/assets/images/zkbc.jpg" class="titleImg"/>
    <div class="container-part">
      <div class="title-part" v-if="isChange" @click="changeLangue">English</div>
      <div class="title-part" v-if="isDeal" @click="dealPlan">解决方案</div>
      <div class="title-part" v-if="isProduct" @click="productCenter">产品中心</div>
      <div class="title-part" v-if="isCase" @click="calssicCase">典型案例</div>
      <div class="title-part" v-if="isPartner" @click="partner">合作伙伴</div>
      <div class="title-part" v-if="isCulture" @click="culture">企业文化</div>
      <div class="title-part" v-if="isAbout" @click="aboutUs">关于我们</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-bar',
  props: {
    isChange: {
      type: Boolean,
      default: true
    },
    isDeal: {
      type: Boolean,
      default: true
    },
    isProduct: {
      type: Boolean,
      default: true
    },
    isCase: {
      type: Boolean,
      default: true
    },
    isPartner: {
      type: Boolean,
      default: true
    },
    isCulture: {
      type: Boolean,
      default: true
    },
    isAbout: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeLangue () {
      this.$emit('changeLangue');
    },
    dealPlan () {
      this.$emit('dealPlan');
    },
    productCenter () {
      this.$emit('productCenter');
    },
    calssicCase () {
      this.$emit('calssicCase');
    },
    partner () {
      this.$emit('partner');
    },
    culture () {
      this.$emit('culture');
    },
    aboutUs () {
      this.$emit('aboutUs');
    }
  }
};
</script>

<style lang="less">
@import "header-bar";
</style>
