<template>
  <div class="container-Box">
    <section class="mainbox">
      <el-row class="firstLine">
        <el-col :span="24">
          <div class="bottom">
            <div class="singleCol singleFirst">
              <div>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('小时产量/台') }}</h3>
                    <h4>小时产量/台</h4>
                  </span>
                </p>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('人均效率/UPPH') }}</h3>
                    <h4>人均效率/UPPH</h4>
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('应出勤率/人') }}</h3>
                    <h4>应出勤/人</h4>
                  </span>
                </p>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('实出勤/人') }}</h3>
                    <h4>实出勤/人</h4>
                  </span>
                </p>
              </div>
            </div>

            <div class="singleCol singleFirst">
              <div>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('当前计划/台') }}</h3>
                    <h4>当前计划/台</h4>
                  </span>
                </p>
                <p>
                  <span class="realSpace">
                    <h3>{{ getValue('完成率/%') }}</h3>
                    <h4>完成率/%</h4>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </el-col>

        <div class="singleCol singleCenter">
          <div>
            <p class="realProduct">
              <span class="realSpace">
                <h3>{{ getValue('实时产量/台') }}</h3>
                <h4>实时产量/台</h4>
              </span>
            </p>
          </div>
        </div>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="left">
            <div ref="echartTableRef1" class="echarts"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <div ref="echartTableRef2" class="echarts"></div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { getTable01 } from '@/api/index.js'

export default {
  name: 'index01',
  props: {
    searchDate: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      listdata: [],
      listRightTopdata: [],
      listRightDowndata: [],
      table1X: [],
      table1Value: [],
      table2X: [],
      table2Value: [],
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    getValue(key) {
      let target = this.listdata.Members?.find(item => item.Caption === key)
      if (target) {
        return target.Value
      }
    },
    async getTable(time) {
      const { Data } = await getTable01(time)
      this.listdata = Data.Part1Object
      this.listRightTopdata = Data.Part2Object.Members
      this.listRightDowndata = Data.Part3Object.Members

      this.table1X = this.listRightTopdata.map(item => item.Caption)
      this.table2X = this.listRightDowndata.map(item => item.Caption)

      this.table1Value = this.listRightTopdata.map(item => item.Value)
      this.table2Value = this.listRightDowndata.map(item => item.Value)

      // rightDown
      let t1 = {
        yname: 'UPH (台)',
        tableX: this.table1X,
        tableValue: this.table1Value,
      }
      let t2 = {
        yname: '测试 (MIN)',
        tableX: this.table2X,
        tableValue: this.table2Value,
      }
      this.getChartsOption('echartTableRef1', t1)
      this.getChartsOption('echartTableRef2', t2)
    },
    getChartsOption(refKey, obj) {
      let options = {
        tooltip: {},
        grid: {
          left: '2%',
          right: '1%',
          bottom: '3%',
          top: '18%',
          containLabel: true,
        },
        xAxis: [
          {
            data: obj.tableX,
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: '#0a74a2',
              },
            },
            axisLabel: {
              color: '#fff',
            },
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#0a74a2',
              },
            },
          },
        ],
        yAxis: {
          name: obj.yname,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#0e4861',
            },
          },
          axisLine: {
            lineStyle: {
              type: 'dashed',
              color: '#fff',
            },
          },
          axisLabel: {
            align: 'center',
          },
        },
        series: [
          {
            name: '生产数量',
            type: 'bar',
            data: obj.tableValue,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#307cd0' },
                { offset: 0.5, color: '#2667a6' },
                { offset: 1, color: '#123148' },
              ]),
            },
          },
        ],
      }

      this.getChartTable(refKey, options)
    },

    getChartTable(elRef, options) {
      this.$nextTick(() => {
        if (this.$refs[elRef]) {
          const myChart = this.$echarts.init(this.$refs[elRef])
          myChart.clear()
          myChart.setOption(options)
          window.onresize = () => {
            myChart.resize()
          }
        }
      })
    },
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
}
</script>

<style scoped lang="scss">
.mainbox {
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  // display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  & > .el-row {
    height: 40%;
  }
  & > .el-row:first-of-type {
    height: 60%;
    position: relative;
  }
  .bottom {
    height: 100%;
    background: url('~@/assets/p1/banner.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 3% 5% 5% 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .singleFirst {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      width: 3.65rem;
      height: 1.7rem;
      max-height: 120px;
      background: url('~@/assets/p1/single.png') no-repeat center;
      background-size: 100% 100%;
      margin: 0.5rem 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      // padding-left: 0.43rem;
      font-size: 0.23rem;
      text-align: center;

      .realSpace {
        width: 70%;
      }
      h3 {
        color: #00f1ff;
        text-align: center;
        // margin-left: 0.5rem;
      }
    }

    .realProduct {
      background-image: unset;
    }
  }
  .left {
    height: 100%;
    background: url('~@/assets/p1/left.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 10% 8% 8% 10%;
  }

  .right {
    display: flex;
    height: 100%;
    background: url('~@/assets/p1/right.png') no-repeat center;
    background-size: 100% 100%;
    padding: 10% 8% 8% 10%;
    #table {
      flex: 1;
    }
  }
}

/deep/table[id^='table'] {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 0.225rem;
  thead {
    height: 5%;
    tr {
      height: 100%;
    }
    th {
      font-weight: 400;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  tbody {
    tr {
      height: 16.66%;
      justify-content: center;
      align-items: center;
    }
  }

  tbody,
  thead {
    tr {
      display: flex;
      td,
      th {
        flex: 1;
        text-align: center;
      }
    }
  }

  tbody tr:nth-child(2n + 1) {
    background-color: #093d53;
    box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
  }
}

/deep/#table2 {
  tr {
    height: 20%;
  }
}

/deep/#table3 {
  tr {
    height: 20%;
  }
  tbody {
    tr td:nth-of-type(3) {
      color: #ff0000;
    }
  }
}

.singleCenter {
  position: absolute;
  top: 42%;
  left: 62%;
  h3,
  h4 {
    text-align: center;
    font-size: 0.28rem;
  }
  h3 {
    color: #00f1ff;
  }
}

.echarts {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1600px) {
  .mainbox .bottom {
    padding: 3% 4%;
  }

  .singleCenter {
    position: absolute;
    top: 40%;
    left: 62%;
  }

  .mainbox .left {
    padding: 6%;
  }
  .mainbox .right {
    padding: 6%;
  }
}
</style>
