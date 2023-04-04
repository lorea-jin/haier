<template>
  <div class="layoutPage">
    <header>
      <h1>{{ $route.meta.title }}</h1>
      <div class="showTime">
        <span v-html="nowTime"></span>
      </div>
    </header>

    <div class="nav" v-show="$route.meta.isShow">
      <router-link to="/01">商用二线质量生产信息看板</router-link>
      <router-link to="/02">双系统充氦回收机</router-link>
      <router-link to="/03">抽真空</router-link>
      <router-link to="/04">冷媒灌注</router-link>
      <router-link to="/05">卤检</router-link>
      <router-link to="/06">安全性能测试</router-link>
      <router-link to="/07">商用质量生产信息看板</router-link>
      <router-link to="/08">商用二线在线履历</router-link>
      <router-link to="/09">下线及提升机监控</router-link>
    </div>
    <router-view :key="$route.path" :searchDate="todayDate"></router-view>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return { nowTime: '', todayDate: '' }
  },
  created() {
    setInterval(this.getTime, 1000)
  },
  methods: {
    getTime() {
      var myDate = new Date()
      var myYear = myDate.getFullYear()
      var myMonth = myDate.getMonth() + 1
      var myToday = myDate.getDate()
      // var myDay = myDate.getDay()
      var myHour = myDate.getHours()
      var myMinute = myDate.getMinutes()

      this.nowTime =
        myYear + '-' + this.fillZero(myMonth) + '-' + this.fillZero(myToday) + '&nbsp;&nbsp;' + this.fillZero(myHour) + ':' + this.fillZero(myMinute)

      this.todayDate = myYear + '-' + this.fillZero(myMonth) + '-' + this.fillZero(myToday)
    },

    getToday() {},
    fillZero(str) {
      var realNum
      if (str < 10) {
        realNum = '0' + str
      } else {
        realNum = str
      }
      return realNum
    },
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
}
</script>

<style scoped lang="scss">
.nav {
  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    font-size: 0.25rem;
    color: #fff;
    margin: 20px;
  }
}

.layoutPage {
  height: 100%;
  width: 100%;
  header {
    height: 1rem;
  }
  /deep/.container-Box {
    height: calc(100% - 1rem) !important;
  }
}

@media screen and (max-width: 1700px) {
  .showTime {
    right: 1.2rem;
  }
}
</style>
