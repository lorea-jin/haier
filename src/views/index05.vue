<template>
  <div class="container-Box">
    <section class="mainbox">
      <el-row class="oneLine">
        <el-col :span="12">
          <div class="left" id="table">
            <el-table :data="tableData">
              <el-table-column type="index" :index="indexMethod" align="center"></el-table-column>
              <el-table-column prop="Model" label="机器条码" align="center"></el-table-column>
              <el-table-column prop="ModelID" label="机器型号" align="center"></el-table-column>
              <el-table-column prop="Date" label="时间" :formatter="formatter" align="center"></el-table-column>
              <el-table-column prop="Status" label="是否合格" align="center">
                <template #default="scope">
                  <span v-if="scope.row.Status == 1" class="fail">不合格</span>
                  <span v-if="scope.row.Status == 0" class="pass">合格</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12" class="right">
          <el-row class="RightBox">
            <el-col>
              <!-- <div class="Content"><table id="table2" ref="table2"></table></div> -->
              <div id="table">
                <el-table :data="listRightTopdata">
                  <el-table-column prop="Caption" label="" align="center"></el-table-column>
                  <el-table-column prop="value1" label="一次性合格率" align="center"></el-table-column>
                  <el-table-column prop="value2" label="返修合格率" align="center"></el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>

          <el-row class="RightBox chartsRow">
            <el-col :span="10" class="listCharts">
              <div class="chartsHead">
                <div class="item total">
                  <div class="number">{{ 798 }}</div>
                  <div>
                    <div class="numberCircle">Total production</div>
                    <div>生产总数</div>
                  </div>
                </div>
                <div class="item PiepassNo">
                  <div class="number">{{ 694 }}</div>
                  <div>
                    <div class="numberCircle">Qualified quantity</div>
                    <div>合格数量</div>
                  </div>
                </div>
              </div>
              <div ref="echartPieleRef1" class="echarts"></div>
            </el-col>
            <!-- 表格 -->
            <el-col :span="14">
              <div ref="echartTableRef" class="echarts"></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
// import { getTable05 } from '@/api/index.js'
import mockData from '@/constant/data.json'
export default {
  name: '',
  props: {
    searchDate: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      tableData: [],
      listRightTopdata: [],
      listRightBottomdata: [],
      dateArr: [],
      productNo: [],
      passNo: [],
      productNoTotal: 0,
      passNoTotal: 0,
      passRate: '',
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable05(time)
			console.log(time)
      const { Data } = await mockData.getTable05

      this.tableData = Data.Part1Objects
      this.listRightTopdata = this.changeToElTableData(Data.Part2Objects)
      this.listRightBottomdata = this.changeToElTableData(Data.Part3Objects)

      // 处理表格数据
      this.dateArr = this.listRightBottomdata.map(item => item.Caption.slice(5))
      this.productNo = this.listRightBottomdata.map(item => item.value1)
      this.passNo = this.listRightBottomdata.map(item => item.value2)
      this.productNoTotal = this.productNo.reduce((pre, cur) => (pre = pre + cur), 0)
      this.passNoTotal = this.passNo.reduce((pre, cur) => (pre = pre + cur), 0)
      this.passRate = ((this.passNoTotal / this.productNoTotal) * 100).toFixed(0)
      this.getChartsOption()

      let pie2 = {
        rate: this.passRate,
        surplus: 100 - this.passRate,
        name: '合格数量',
      }

      this.getPieOption(pie2)
    },
    indexMethod(index) {
      return `${index+1}#`
    },
    getChartsOption() {
      let options = {
        tooltip: {},
        grid: {
          left: '0%',
          right: '1%',
          bottom: '5%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          data: this.dateArr,
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#7e8c97',
            },
          },
          axisLabel: {
            color: '#fff',
          },
        },
        legend: {
          textStyle: {
            color: '#fff',
          },
          data: [
            {
              name: '生产数量',
              itemStyle: {
                color: '#307cd0',
              },
            },
            {
              name: '合格数量',
              itemStyle: {
                color: '#26d1ad',
              },
            },
          ],
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#7e8c97',
            },
          },
          axisLine: {
            lineStyle: {
              type: 'dashed',
              color: '#fff',
            },
          },
        },
        series: [
          {
            name: '生产数量',
            type: 'bar',
            data: this.productNo,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#307cd0' },
                { offset: 0.5, color: '#2667a6' },
                { offset: 1, color: '#123148' },
              ]),
            },
          },
          {
            name: '合格数量',
            type: 'bar',
            data: this.passNo,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#26d1ad' },
                { offset: 0.5, color: '#20a18d' },
                { offset: 1, color: '#123148' },
              ]),
            },
          },
        ],
      }

      this.getChartTable('echartTableRef', options)
    },

    getPieOption(obj, color = '#3bdfbc') {
      let option = {
        series: [
          {
            name: obj.rate,
            type: 'pie',
            radius: ['50%', '60%'],
            hoverAnimation: true,
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              fontSize: 20,
              color: '#fff',
              fontWeight: 'bold',
              formatter: '{c}%',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: this.passRate,
                name: '合格数量',
                itemStyle: {
                  color,
                },
              },
              { value: 100 - this.passRate, name: '剩余', itemStyle: { color: '#74869b' }, emphasis: { disabled: true, color: '#74869b' } },
            ],
          },
        ],
      }
      this.getChartTable('echartPieleRef1', option)
    },
    getChartTable(elRef, options) {
      this.$nextTick(() => {
        if (this.$refs[elRef]) {
          const myChart = this.$echarts.init(this.$refs[elRef])
          myChart.clear()
          myChart.setOption(options)
          window.addEventListener('resize', () => {
            myChart.resize()
          })
        }
      })
    },

    formatter(row) {
      return this.getTime(row.Date)
    },

    getTime(time) {
      var myDate = new Date(time)
      var myYear = myDate.getFullYear()
      var myMonth = myDate.getMonth() + 1
      var myToday = myDate.getDate()
      return myYear + '-' + this.fillZero(myMonth) + '-' + this.fillZero(myToday)
    },

    fillZero(str) {
      var realNum
      if (str < 10) {
        realNum = '0' + str
      } else {
        realNum = str
      }
      return realNum
    },

    changeToElTableData(Objects) {
      let newData = []
      for (let i = 0; i < Objects[0].Members.length; i++) {
        let date = Objects[0].Members[i].Caption
        let newObj = {
          Caption: date,
        }
        for (let j = 0; j < Objects.length; j++) {
          // let seriesName = Objects[j].Series
          let value = Objects[j].Members[i].Value
          newObj['value' + (j + 1)] = value
        }
        newData.push(newObj)
      }
      return newData
    },
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
}
</script>

<style scoped lang="scss">
.oneLine {
	width: 100%;
  height: 100%;
}

.mainbox {
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  // display: flex;
  height: 100%;
  width: 100%;
  .bottom {
    height: 100%;
    background: url('~@/assets/p7/bottomTitle.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 3%;
  }
  .left {
    height: 100%;
    background: url('~@/assets/p5/left.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 7% 6% 10% 8%;
  }

  .right {
    height: 100%;
    background-size: 100% 100%;
    .RightBox {
      height: 50%;
      background: url('~@/assets/p5/rightUp.png') no-repeat center;
      background-size: 100% 100%;
      padding: 7% 8% 8% 6%;
    }
    /deep/.el-col {
      height: 100%;
      .echarts {
        height: 100%;
      }
    }
  }

  .Content {
    overflow-y: auto;
    background-clip: padding-box;
    height: 100%;
    // position: absolute;
    // left: 6%;
    // right: 4%;
    // top: 8%;
    // bottom: 0;
  }
}

#table {
  height: 100%;
  width: 100%;
  /deep/.el-table {
    height: 100%;
    width: 100%;
    font-size: 0.225rem;
    color: #fff;
    background-color: unset !important;
  }

  /deep/thead {
    height: 5%;

    tr {
      height: 100%;
      background-color: unset;
    }
    th {
      font-weight: 400;
      padding-top: 5px;
      padding-bottom: 5px;
      background-color: unset !important;
      color: #fff;
      border: none !important;
    }
  }
  /deep/tbody {
    tr {
      height: 9.09%;
      justify-content: center;
      align-items: center;
      td {
        border: none !important;
      }
    }
  }

  /deep/tbody tr:nth-child(2n + 1) {
    background-color: #093d53;
    box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;
  }
  /deep/tbody tr:nth-child(2n) {
    background-color: transparent;
  }
  /deep/ .el-table tbody tr:hover > td {
    background-color: unset !important;
  }

  /deep/ .el-table__inner-wrapper::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    z-index: 3;
  }
}

.pass {
  color: #00ff1c;
}

.fail {
  color: #ff0000;
}

.title {
  margin: 0.05rem;
  text-align: center;
  font-size: 22px;
  position: absolute;
  left: 4%;
  top: 25%;
  bottom: 25%;
}

/deep/.Content {
  table[id^='table'] {
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
        height: 9.09%;
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

  #table2 {
    tr {
      height: 20%;
    }
  }
}

.chartsHead {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    .number {
      font-size: 0.28rem;
      margin-right: 0.1rem;
    }
    .numberCircle {
      font-style: 0.2rem;
    }
    .numberCircle::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #2fddb9;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .total {
    .number {
      color: #4ea7bc;
    }
    .numberCircle::before {
      background-color: #4ea7bc;
    }
  }
  .PiepassNo {
    .number {
      color: #2fddb9;
    }
  }
}

@media screen and (max-width: 1400px) {
  .mainbox .left {
    padding-top: 8%;
  }

  .mainbox .right .el-row {
    padding-top: 8%;
  }
}

@media screen and (min-width: 1600px) {
  .mainbox .right .RightBox {
    padding-bottom: 5%;
  }
}
</style>
