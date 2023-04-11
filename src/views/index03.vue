<template>
  <div class="container-Box">
    <section class="mainbox">
      <el-row>
        <el-col :span="24">
          <div class="bottom">
            <table id="table1" ref="table1"></table>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="9">
          <div class="left">
            <table id="table2" ref="table2"></table>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="right">
            <table id="table3" ref="table3"></table>
            <table id="table4" ref="table4"></table>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
// import { getTable03 } from '@/api/index.js'
import mockData from '@/constant/data.json'
let HaiLeftConstant = {
  Series: '',
  Model: '产品型号',
  ModelID: '机编',
  Param1: '抽真空时间',
  Param2: '真空度',
  Param3: '判定结果',
  Param4: '人工扫描合格率',
}
export default {
  name: 'index03',
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
      listRightDowndataBefore: [],
      listRightDowndataAfter: [],
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable03(time)
      console.log(time)
      const { Data } = await mockData.getTable03
      this.listdata = Data.Part1Objects
      this.listRightTopdata =JSON.parse(JSON.stringify( Data.Part2Objects))
      this.listRightDowndata = Data.Part3Objects

      // 上部分
      // this.listdata.unshift(HaiLeftConstant)
      this.listdata = [HaiLeftConstant, ...this.listdata]
      this.generateTable(this.$refs.table1, this.listdata)
      this.generateTableHead(this.$refs.table1, this.listdata)

      // 下左部分
      this.listRightTopdata = this.delWithRight(this.listRightTopdata)
      this.generateTable(this.$refs.table2, this.listRightTopdata)
      this.generateTableHead(this.$refs.table2, this.listRightTopdata)

      // rightDown
      let before = JSON.parse(JSON.stringify(this.listRightDowndata)).map(item => {
        return {
          Series: item.Series,
          Members: item.Members.slice(0, 5),
        }
      })
      let after = JSON.parse(JSON.stringify(this.listRightDowndata)).map(item => {
        return {
          Series: item.Series,
          Members: item.Members.slice(5),
          // Members:item.Members.slice(6, 5)
        }
      })

      this.listRightDowndataBefore = this.delWithRight(before)
      this.listRightDowndataAfter = this.delWithRight(after)

      // this.listRightDowndataBefore.unshift(firstCol)
      // this.listRightDowndataAfter.unshift(firstCol)

      this.generateTable(this.$refs.table3, this.listRightDowndataBefore)
      this.generateTableHead(this.$refs.table3, this.listRightDowndataBefore)

      this.generateTable(this.$refs.table4, this.listRightDowndataAfter)
      this.generateTableHead(this.$refs.table4, this.listRightDowndataAfter)
    },

    generateTable(mytable, data) {
      debugger
      for (const key in data[0]) {
        if (key !== 'Series') {
          let row = mytable.insertRow()
          for (const obj of data) {
            let cell = row.insertCell()
            let text = document.createTextNode(obj[key])
            // left  -- 4

            if (key == 'Param3' && obj[key] == 'TRUE') {
              row.className = 'result'
              cell.style.color = '#00ff1c'
            } else if (key == 'Param3' && obj[key] == 'FALSE') {
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
      let firstCol = {
        Series: '',
      }
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
      re = [firstCol, ...re]
      return re
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
.mainbox {
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  // display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  .bottom {
    height: 100%;
    background: url('~@/assets/p7/bottom.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 3% 5% 5% 5%;
  }
  .left {
    height: 100%;
    background: url('~@/assets/p7/left.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 10% 8% 8% 10%;
  }

  .right {
    display: flex;
    height: 100%;
    background: url('~@/assets/p7/right.png') no-repeat center;
    background-size: 100% 100%;
    padding: 6% 6% 6% 4%;
    #table {
      flex: 1;
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

.pass {
  color: #00ff1c;
}

.fail {
  color: #ff0000;
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

/deep/#table3,
/deep/#table4 {
  tr {
    height: 20%;
  }
  tbody {
    tr td:nth-of-type(3) {
      color: #ff0000;
    }
  }
}

@media screen and (min-width: 1600px) {
  .mainbox .bottom {
    padding: 3% 4%;
  }
}
</style>
