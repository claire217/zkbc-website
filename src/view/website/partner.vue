<template>
  <div>
    <header-bar @home="home" @dealPlan="dealPlan" @partner="partner" @aboutUs="aboutUs" />
    <footer-part></footer-part>
  </div>
</template>

<script>
export default {
  name: 'partner',
  data () {
    return {

    };
  },
  methods: {
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
  }
};
</script>

<style lang="less">
@import "website";
</style>
