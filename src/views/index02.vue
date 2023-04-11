<template>
  <div class="container-Box" ref="containerRef">
    <section class="mainbox">
      <div class="column">
        <div class="left">
          <div class="leftContent Content"><table id="table1" ref="table1"></table></div>
        </div>
      </div>
      <div class="column">
        <div class="right">
          <div class="rightTop">
            <div class="Content"><table id="table2" ref="table2"></table></div>
          </div>
          <div class="rightDown">
            <div class="Content"><table id="table3" ref="table3"></table></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { getTable02 } from '@/api/index.js'
import mockData from '@/constant/data.json'

const HaiLeftConstant = {
  Series: '',
  Model: '产品型号',
  ModelID: '机编',
  Param1: '充氮气压力',
  Param2: '大漏时间',
  Param3: '大漏检测时间',
  Param4: '大漏压降',
  Param5: '抽空压力',
  Param6: '充氮气压力',
  Param7: '氮气浓度',
  Parma8: '判定结果',
  Parma9: '人工扫描合格率',
}
const firstCol = {
  Series: '',
}
export default {
  name: 'index02',
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
    }
  },
  created() {
	
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable02(time)
      console.log(time)
      const { Data } = await mockData.getTable02
      console.log(Data)

      this.listdata = Data.Part1Objects
      this.listRightTopdata = Data.Part2Objects
      this.listRightDowndata = Data.Part3Objects

      // this.listdata.unshift(HaiLeftConstant)
			this.listdata=[HaiLeftConstant,...this.listdata]

      this.generateTable(this.$refs.table1, this.listdata)
      this.generateTableHead(this.$refs.table1, this.listdata)

      this.listRightTopdata = this.delWithRight(this.listRightTopdata)
      this.listRightTopdata.unshift(firstCol)
      this.generateTable(this.$refs.table2, this.listRightTopdata)
      this.generateTableHead(this.$refs.table2, this.listRightTopdata)

      // rightDown
      this.listRightDowndata = this.delWithRight(this.listRightDowndata)
      this.listRightDowndata.unshift(firstCol)
      this.generateTable(this.$refs.table3, this.listRightDowndata)
      this.generateTableHead(this.$refs.table3, this.listRightDowndata)
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
            if (key == 'Parma8' && obj[key] == 'TRUE') {
              row.className = 'result'
              cell.style.color = '#00ff1c'
            } else if (key == 'Parma8' && obj[key] == 'FALSE') {
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

}
</script>

<style lang="scss">
.mainbox {
  width: 100%;
  min-width: 1024px;
  padding: 0.125rem 0.125rem 0;
  display: flex;
  height: 100%;
  .column {
    flex: 1;
    margin: 0.125rem;
    .left {
      height: 100%;
      background: url('~@/assets/p4/left.png') no-repeat center;
      background-size: 100% 100%;
      position: relative;
      padding: 10% 5% 10% 6%;
    }

    .right {
      display: flex;
      flex-direction: column;
      height: 100%;
      .rightTop {
        flex: 1;
        background: url('~@/assets/p4/rightTop.png') no-repeat center;
        background-size: 100% 100%;
        padding: 10% 7% 10% 5%;
      }
      .rightDown {
        flex: 1;
        background: url('~@/assets/p4/rightDown.png') no-repeat center;
        background-size: 100% 100%;
        padding: 10% 7% 10% 5%;
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
}

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

#table3 {
  tr {
    height: 20%;
  }
  tbody {
    tr td:nth-of-type(3) {
      color: #ff0000;
    }
  }
}
</style>
