<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home',
  props: {},
  components: {},
  data() {
    return {
     
    
    }
  },


  mounted() {},
  watch: {},
  computed: {},
  filters: {},
}
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  background: url('~@/assets/p4/bg.png') no-repeat center;
  background-size: 100% 100%;
}
header {
  position: relative;
  background: url('~@/assets/p4/top.png') no-repeat top center;
  background-size: 100% 100%;
  h1 {
    font-size: 0.38rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
    transform: translateY(10%);
    background-image: linear-gradient(to bottom, #fff, #1cbce3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .showTime {
    position: absolute;
    top: 0.15rem;
    right: 0.85rem;
    font-size: 0.25rem;
    color: #1898e2;
  }
}
</style>
