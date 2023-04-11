<template>
  <div class="container-Box">
    <section class="mainbox">
      <el-row class="oneLine">
        <el-col :span="12">
          <div class="left" id="table">
            <div class="leftContent Content"><table id="table1" ref="table1"></table></div>
          </div>
        </el-col>
        <el-col :span="12" class="right">
          <el-row class="RightBox">
            <el-col>
              <!-- <div class="Content"><table id="table2" ref="table2"></table></div> -->
              <div id="table" class="elBox">
                <el-table :data="listRightTopdata">
                  <el-table-column prop="Caption" label="" align="center"></el-table-column>
                  <el-table-column prop="value1" label="一次性合格率" align="center"></el-table-column>
                  <el-table-column prop="value2" label="返修合格率" align="center"></el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>

          <el-row class="RightBox">
            <div id="table" class="elBox">
              <el-table :data="listRightBottomdata">
                <el-table-column prop="Caption" label="" align="center"></el-table-column>
                <el-table-column prop="value1" label="已检测数量" align="center"></el-table-column>
                <el-table-column prop="value2" label="不合格数量" align="center">
									<template #default="scope">
									<span class="fail">{{ scope.row.value2 }}</span>
									</template>
								</el-table-column>
                <el-table-column prop="value3" label="一次性合格率" align="center"></el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
const firstCol = {
  Series: '',
}
// import { getTable04 } from '@/api/index.js'
import mockData from '@/constant/data.json'
const HaiLeftConstant = {
  Series: '',
  Model: '产品型号',
  ModelID: '机编',
  Param1: '冷媒类型',
  Param2: '预抽真空',
  Param3: '抽真空',
  Param4: '泄露真空度',
  Param5: '充注量',
  Param6: '判定结果',
  Param7: '人工扫描合格率',
}
export default {
  name: 'index04',
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
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable04(time)
			console.log(time)
      const { Data } = await mockData.getTable04

      this.tableData = Data.Part1Objects
      this.listRightTopdata = this.changeToElTableData(Data.Part2Objects)
      this.listRightBottomdata = this.changeToElTableData(Data.Part3Objects)

      // this.tableData.unshift(HaiLeftConstant)
			this.tableData=[HaiLeftConstant,...this.tableData]

      this.generateTable(this.$refs.table1, this.tableData)
      this.generateTableHead(this.$refs.table1, this.tableData)
    },
    indexMethod(index) {
      return `${index+1}#`
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
    generateTable(mytable, data) {
      // const row = data[0]
      for (const key in data[0]) {
        if (key !== 'Series') {
          let row = mytable.insertRow()
          for (const obj of data) {
            let cell = row.insertCell()
            let text = document.createTextNode(obj[key])
            // left  -- 8
            if (key == 'Param6' && obj[key] == 'TRUE') {
              row.className = 'result'
              cell.style.color = '#00ff1c'
            } else if (key == 'Param6' && obj[key] == 'FALSE') {
              row.className = 'result'
              cell.style.color = '#ff0000'
            }

            cell.appendChild(text)
          }
        }
      }
    },
    generateTableHead(mytable, list) {
      let thead = mytable.createTHead()
      let row = thead.insertRow()

      for (let obj of list) {
        let th = document.createElement('th')
        let text = document.createTextNode(obj['Series'])
        th.appendChild(text)
        row.appendChild(th)
      }
    },

    delWithRight(arr) {
      let re = arr.map((obj, i) => {
        for (const key in obj.Members) {
          obj[`Value${key}`] = obj.Members[key].Value
          if (i == 0) {
            firstCol[`Value${key}`] = obj.Members[key].Caption
          }
        }
        delete obj.Members
        return {
          ...obj,
        }
      })
      return re
    },
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
  beforeUnmount() {
    this.$refs.table1.remove()
  },
}
</script>

<style scoped lang="scss">
.oneLine {
  height: 100%;
	flex:1;
}

.mainbox {
	width: 100%;
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  // display: flex;
  height: 100%;

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

.elBox {
  height: 100%;
  width: 100%;
  /deep/.el-table {
    height: 100%;
    width: 100%;
    font-size: 0.225rem;
    color: #fff;
    background-color: unset !important;
  }

  /deep/.el-scrollbar__view {
    height: 100%;
    .el-table__body {
      height: 100%;
    }
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
        height: 11.11%;
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
