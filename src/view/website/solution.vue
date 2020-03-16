<template>
  <div>
    <header-bar @aboutUs="aboutUs" @changeLangue="changeLangue" @dealPlan="dealPlan"
                @productCenter="productCenter" @calssicCase="calssicCase" @partner="partner" @culture="culture"/>
    <footer-part></footer-part>
  </div>
</template>

<script>
export default {
  name: 'solution',
  data () {
    return {

    };
  },
  methods: {
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
  }
};
</script>

<style scoped>

</style>
