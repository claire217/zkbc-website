<template>
  <div id="app" :key="appKey">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      appKey: 1
    };
  },
  watch: {
    '$route': function (newUrl, oldUrl) {
      this.appKey = new Date().getTime();
    }
  }
};
</script>

<style lang="less">
  .size{
    width: 100%;
    height: 100%;
  }
  html,body{
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
</style>
