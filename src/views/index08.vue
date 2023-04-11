<template>
  <div class="container-Box">
    <section class="mainbox">
      <div class="column">
        <div class="left">
          <div class="leftContent Content">
            <div id="table">
              <el-table :data="tableData">
                <el-table-column type="index" :index="indexMethod" align="center"></el-table-column>
                <el-table-column prop="Model" label="机器条码" align="center"></el-table-column>
                <el-table-column prop="ModelID" label="机器型号" align="center"></el-table-column>
                <el-table-column prop="Param1" label="氨检" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param1 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param1 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param2" label="抽真空" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param2 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param2 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param3" label="卤检" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param3 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param3 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param4" label="二次卤检" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param4 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param4 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param5" label="冷媒灌注" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param5 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param5 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param6" label="运转测试" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param6 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param6 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Param7" label="终检外观与下线" align="center">
                  <template #default="scope">
                    <span v-if="scope.row.Param7 == '不合格'" class="fail">不合格</span>
                    <span v-if="scope.row.Param7 == '合格'" class="pass">合格</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { getTable08 } from '@/api/index.js'
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
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      // const { Data } = await getTable08(time)
			console.log(time)
      const { Data } = await mockData.getTable08

      this.tableData = Data
    },
    indexMethod(index) {
      return `${index}#`
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
  display: flex;
  height: 100%;
  width: 100%;
  .column {
    flex: 1;
    margin: 0.125rem;
    .left {
      height: 100%;
      background: url('~@/assets/p8/big.png') no-repeat center;
      background-size: 100% 100%;
      position: relative;
      padding: 5% 5% 10% 6%;
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

@media screen and (min-width: 1600px) {
  .mainbox .column .left {
    padding: 3% 5%;
  }
}
</style>
