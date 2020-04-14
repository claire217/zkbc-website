<template>
  <div class="header-website">
    <img src="@/assets/images/zkbc.jpg" class="titleImg"/>
    <div class="container-part">
      <div class="title-part" v-if="isChange" @click="home">首页</div>
      <div class="title-part" v-if="isDeal" @click="dealPlan">解决方案</div>
      <div class="title-part" v-if="isPartner" @click="partner">合作伙伴</div>
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
    isPartner: {
      type: Boolean,
      default: true
    },
    isAbout: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    home () {
      this.$emit('home');
    },
    dealPlan () {
      this.$emit('dealPlan');
    },
    partner () {
      this.$emit('partner');
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
