<template>
  <div class="container-Box">
    <section class="mainbox">
      <el-row>
        <el-col :span="9">
          <div class="left">
            <div id="table">
              <el-table :data="tableData">
                <el-table-column prop="ModelID" align="center">
                  <template #default="scope">
                    <i class="square"></i>
                    <span class="modelId">型号: {{ scope.row.ModelID }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param1" align="center">
                  <template #default="scope">
                    <i class="squareLine"></i>
                    <span class="modelId">型号: {{ scope.row.Param1 }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <el-row class="right">
            <el-col :span="18">
              <div ref="echartTableRef" class="echarts"></div>
            </el-col>
            <el-col :span="6" class="listCharts">
              <el-row>
                <h3>
                  生产数量
                  <br />
                  <span>{{ this.productNoTotal }}</span>
                  &nbsp;个
                </h3>
                <div ref="echartPieRef1" class="echarts"></div>
              </el-row>

              <el-row>
                <h3>
                  合格数量
                  <br />
                  <span>{{ this.passNoTotal }}</span>
                  &nbsp;个
                </h3>
                <div ref="echartPieRef2" class="echarts"></div>
              </el-row>

              <el-row>
                <h3>
                  未合格数量
                  <br />
                  <span>{{ this.failNoTotal }}</span>
                  &nbsp;个
                </h3>
                <div ref="echartPieRef3" class="echarts"></div>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="bottom">
            <div class="title">
              工
              <br />
              单
              <br />
              总
              <br />
              体
              <br />
              合
              <br />
              格
              <br />
              率
            </div>
            <div class="circleLine">
              <div class="pieChartsItem">
                <div ref="echartPieRef4" class="echarts" id="echartPieRef4"></div>
                <h2>
                  <p>{{ '氦气合格率' }}</p>
                  <p>{{ 'HELIUM' }}</p>
                </h2>
              </div>
              <div class="pieChartsItem">
                <div ref="echartPieRef5" class="echarts" id="echartPieRef5"></div>
                <h2>
                  <p>{{ '氦气合格率' }}</p>
                  <p>{{ 'HELIUM' }}</p>
                </h2>
              </div>

              <div class="pieChartsItem">
                <div ref="echartPieRef6" class="echarts" id="echartPieRef6"></div>
                <h2>
                  <p>{{ '注氟合格率' }}</p>
                  <p>{{ 'FLUORINE' }}</p>
                </h2>
              </div>

              <div class="pieChartsItem">
                <div ref="echartPieRef7" class="echarts" id="echartPieRef7"></div>
                <h2>
                  <p>{{ '安全性能检测合格率' }}</p>
                  <p>{{ 'SAFETY' }}</p>
                </h2>
              </div>
              <div class="pieChartsItem">
                <div ref="echartPieRef8" class="echarts" id="echartPieRef8"></div>
                <h2>
                  <p>{{ '运转' }}</p>
                  <p>{{ 'REVOLVE' }}</p>
                </h2>
              </div>
              <div class="pieChartsItem">
                <div ref="echartPieRef9" class="echarts" id="echartPieRef9"></div>
                <h2>
                  <p>{{ '下线' }}</p>
                  <p>{{ 'OFF-LINE' }}</p>
                </h2>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
// import { getTable07 } from '@/api/index.js'
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
      failNoTotal: 0,
      failRate: '',
      pieChartsArr: [
        { id: 4, cname: '氦气合格率', ename: 'HELIUM', color: '#3788e1' },
        { id: 5, cname: '抽真空合格率', ename: 'VACUUM', color: '#51eac7' },
        { id: 6, cname: '注氟合格率', ename: 'FLUORINE', color: '#3788e1' },
        { id: 7, cname: '安全性能检测合格率', ename: 'SAFETY', color: '#51eac7' },
        { id: 8, cname: '运转', ename: 'REVOLVE', color: '#3788e1' },
        { id: 9, cname: '下线', ename: 'OFF-LINE', color: '#f64b4a' },
      ],
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable07(time)
			console.log(time)
      const { Data } = await mockData.getTable07

      this.tableData = Data.Part1Objects
      // 表格
      this.listRightTopdata = this.changeToElTableData(Data.Part2Objects)
      this.listRightBottomdata = Data.Part3Object
      this.pieChartsArr = this.pieChartsArr.map(item => {
        return {
          ...item,
          pie: {
            rate: this.listRightBottomdata[`Param${item.id - 3}`] * 100,
            surplus: 100 - this.listRightBottomdata[`Param${item.id - 3}`] * 100,
            name: 'HE-52315\nOG32154015\n合格',
          },
        }
      })

      // 处理表格数据
      this.dateArr = this.listRightTopdata.map(item => item.Caption.slice(5))
      this.productNo = this.listRightTopdata.map(item => item.value1)
      this.passNo = this.listRightTopdata.map(item => item.value2)

      this.productNoTotal = this.productNo.reduce((pre, cur) => (pre = pre + cur), 0)
      this.passNoTotal = this.passNo.reduce((pre, cur) => (pre = pre + cur), 0)
      this.passRate = ((this.passNoTotal / this.productNoTotal) * 100).toFixed(0)
      this.failNoTotal = this.productNoTotal - this.passNoTotal
      this.failRate = ((this.failNoTotal / this.productNoTotal) * 100).toFixed(0)
      this.getChartsOption()

      let pie1 = {
        rate: (this.productNoTotal / this.productNoTotal) * 100,
        surplus: 0,
        name: '生产数量',
      }
      let pie2 = {
        rate: this.passRate,
        surplus: 100 - this.passRate,
        name: '合格数量',
      }
      let pie3 = {
        rate: 100 - this.passRate,
        surplus: 100 - this.failRate * 1,
        name: '未合格数量',
      }
      // let pie4 = {
      //   rate: 100 - this.passRate,
      //   surplus: 100 - this.failRate * 1,
      //   name: '未合格数量',
      // }

      this.getPieOption('echartPieRef1', pie1, '#80bbff', 'rate')
      this.getPieOption('echartPieRef2', pie2, '#26d1ad', 'rate')
      this.getPieOption('echartPieRef3', pie3, '#f64b4a', 'rate')

      this.pieChartsArr.map(item => {
        this.getPieOption(`echartPieRef${item.id}`, item.pie, item.color, 'name')
      })
    },
    indexMethod(index) {
      return `${index}#`
    },
    getChartsOption() {
      let options = {
        tooltip: {},
        grid: {
          left: '0%',
          right: '5%',
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
              icon: 'roundRect',
              itemStyle: {
                color: '#307cd0',
              },
            },
            {
              name: '合格数量',
              icon: 'roundRect',
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

    getPieOption(refKey, obj, color = '#80bbff', key = 'rate') {
      let option = {
        series: [
          {
            name: obj[key],
            type: 'pie',
            radius: ['65%', '75%'],
            hoverAnimation: true,
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              fontSize: 15,
              color: '#fff',
              fontWeight: 'bold',
              formatter: key == 'rate' ? '{a}%' : '{a}',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                color: '#fff',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: obj.rate, name: obj.name, itemStyle: { color } },
              { value: obj.surplus, itemStyle: { color: '#f1f1f1' }, emphasis: { disabled: true, color: '#f1f1f1' } },
            ],
          },
        ],
      }
      this.getChartTable(refKey, option)
    },
    getChartTable(elRef, options) {
      this.$nextTick(() => {
        if (this.$refs[elRef] || document.getElementById(elRef)) {
          const myChart = this.$echarts.init(this.$refs[elRef] || document.getElementById(elRef))
          myChart.clear()
          myChart.setOption(options)
          window.onresize = () => {
            myChart.resize()
          }
        }
      })
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
.el-row {
  height: 50%;
}
.listCharts {
  .el-row {
    height: 33.33%;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    h3 {
      width: 1.2rem;
      font-size: 0.225rem;
      font-weight: 400;
      span {
        font-size: 0.35rem;
        margin-top: 10px;
      }
    }

    .echarts {
      flex: 1;
    }
  }
}
.mainbox {
  width: 100%;
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  flex-direction: column;
  height: 100%;

  .bottom {
    height: 100%;
    background: url('~@/assets/p7/bottomTitle.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 3% 5%;
  }
  .left {
    height: 100%;
    background: url('~@/assets/p7/left.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 12% 7% 8% 10%;
  }

  .right {
    height: 100%;
    background: url('~@/assets/p7/right.png') no-repeat center;
    background-size: 100% 100%;
    padding: 8% 5% 5%;
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
      height: 20%;
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
  font-size: 19px;
  position: absolute;
  left: 4%;
  top: 25%;
  bottom: 25%;
}

.circleLine {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;

  .echarts {
    width: 100%;
    height: 100%;
  }
  .pieChartsItem {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    p {
      text-align: center;
      font-size: 0.25rem;
      &:nth-of-type(2) {
        font-size: 0.2rem;
      }
    }
    &:nth-of-type(2n + 1) {
      color: #3788e1;
    }
    &:nth-of-type(2n) {
      color: #51eac7;
    }
    &:last-of-type {
      color: #f64b4a;
    }
    .echarts {
      height: 60%;
    }
  }
}

/deep/.left {
  .el-scrollbar__view {
    height: 100%;
  }
  .el-table__body {
    height: 100%;
  }
  .el-table {
    tbody .el-table__row {
      height: 20% !important;
    }
  }
}

@media screen and (min-width: 1600px) {
  .mainbox .right {
    padding: 5% 5% 2%;
  }

  .mainbox .left {
    padding: 8% 7% 5% 10%;
  }
}

/deep/ .el-table {
  tbody td {
    height: 20% !important;
  }
  .square::before {
    display: inline-block;
    content: '';
    width: 0.15rem;
    height: 0.15rem;
    background-color: #60ccff;
    margin-right: 0.2rem;
    vertical-align: middle;
  }

	.squareLine::before {
    display: inline-block;
    content: '';
    width: 0.25rem;
    height: 0.03rem;
    background-color: #3dffd0;
    margin-right: 0.35rem;
    vertical-align: middle;
  }
}
.el-col{
	height: 100%;
}
</style>
