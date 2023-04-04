<template>
  <div class="container-Box">
    <section class="mainbox">
      <div class="column">
        <div class="left">
          <div class="leftContent Content">
            <div id="table">
              <el-table :data="tableData">
                <el-table-column type="index" :index="indexMethod"></el-table-column>
                <el-table-column prop="ID" label="机器条码"></el-table-column>
                <el-table-column prop="Type" label="机器型号"></el-table-column>
                <el-table-column prop="Date" label="时间" :formatter="formatter"></el-table-column>
                <el-table-column label="照片">
                  <template #default="scope">
                    {{ scope.row.ImageName || '暂无' }}
                    <el-button type="text" v-if="scope.row.ImageName" @click="handlePreview(row)">点击查看</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="Status" label="是否合格">
                  <template #default="scope">
                    <span v-if="scope.row.Status == 1" class="fail">不合格</span>
                    <span v-if="scope.row.Status == 0" class="pass">合格</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="right">
          <div class="left">
            <div class="leftContent Content">
              <div class="imgTitle">提升机实时监控</div>
              <img class="imgContent" :src="imgUrl || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getTable09 } from '@/api/index.js'
export default {
  name: 'index09',
  props: {
    searchDate: {
      type: String,
    },
  },
  components: {},
  data() {
    return {
      tableData: [],
      imgUrl: '',
    }
  },
  created() {
    let time = this.searchDate ? this.searchDate : new Date()
    this.getTable(time)
  },
  methods: {
    async getTable(time) {
      const { Data } = await getTable09(time)
      console.log(Data)
      this.tableData = Data
    },
    indexMethod(index) {
      return `${index+1}#`
    },

    handlePreview(row) {
      this.imgUrl = row.ImageUri
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
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
}
</script>

<style scoped lang="scss">
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

.imgTitle {
  color: #fff;
  font-weight: 700;
  font-size: 0.32rem;
  padding: 0 0 0.2rem 0.8rem;
  width: 32%;
  border-bottom: 2px solid #1a9ae6;
}

.imgContent {
  width: 100%;
  object-fit: contain;
  padding: 20px;
}

@media screen and (min-width: 1600px) {
  .mainbox .column .left {
    padding:6% 5% 6% 7%;
  }
}
</style>
