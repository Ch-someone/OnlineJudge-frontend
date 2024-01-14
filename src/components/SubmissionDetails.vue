<template>
  <div class="container">
    <div class="navbar">
      <p>江苏大学OnlineJudge</p>
      <a @click="toHome">首页</a>
      <a @click="toProblemSet">题目列表</a>
      <a @click="toStatus">评测记录</a>
      <a @click="toAbout">关于</a>
      <a v-if="!hasToken"
         @click="toRegister"
         style="float: right">注册</a>
      <a v-if="!hasToken"
         @click="toLogin"
         style="float: right">登录</a>
      <el-dropdown v-if="hasToken"
                   style="float: right">
        <span :v-model="user"
              class="el-dropdown-link">
          {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <transition name="el-zoom-in-bottom">
      <div v-show="show"
           class="status_box">
        <div class="box_title">提交状态</div>
        <el-table :data="currentPageData"
                  style="width: 100%"
                  class="problem_table">
          <el-table-column label="时间"
                           header-align="center"
                           prop="submitDate"
                           width="200">
            <template slot-scope="scope">
              <div class="centered-text">{{ scope.row.submitDate }}</div>
            </template>
          </el-table-column>
          <el-table-column label="题目id"
                           header-align="center"
                           width="200">
            <template slot-scope="scope">
              <span @click="checkProblem(scope.row.probID)"
                    class="ProblemName">
                {{ scope.row.probID }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="作者"
                           header-align="center"
                           width="300">
            <template slot-scope="scope">
              <div class="centered-text">{{ scope.row.userName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="评测结果"
                           header-align="center"
                           width="500">
            <template slot-scope="scope">
              <div class="centered-text">{{ scope.row.status }}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[8]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       style="float:right;margin-right:50px"
                       :total="tableData.length">
        </el-pagination>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    this.checkToken()
    this.getStatus()
    setTimeout(() => {
      this.show = true
    }, 100)
  },
  data() {
    return {
      hasToken: false,
      user: '',
      show: false,
      currentPageData: [],
      currentPage: 1,
      pageSize: 8,
      tableData: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.currentPage = val

      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.currentPageData = this.tableData.slice(start, end)
    },
    async getStatus() {
      if (this.checkToken() === false) return this.$message.error('请先登录')
      const queryParams = this.$route.query
      const ifParams = !!queryParams.userID
      if (ifParams) {
        const { data: result } = await this.$http.get('oj/record?' + 'userID=' + queryParams.userID + '&probID=' + queryParams.probID)
        this.tableData = result
        console.log(result)
      } else {
        const { data: probs } = await this.$http.get('prob/all')
        console.log(probs)
        for (let i = 0; i < probs.length; i++) {
          console.log(probs[i].id)
          const { data: result } = await this.$http.get('oj/record?' + 'userID=' + sessionStorage.userId + '&probID=' + probs[i].id)
          const ifsubmit = !!result
          if (ifsubmit) { this.tableData = this.tableData.concat(result) }
        }
        this.tableData.sort((a, b) => {
          const dateA = new Date(a.submitDate)
          const dateB = new Date(b.submitDate)
          return dateB - dateA
        })
      }
      this.handleSizeChange(8)
    },
    checkProblem(num) {
      this.$router.push('/problemset/' + num)
    },
    checkToken() {
      const token = sessionStorage.getItem('username')
      this.hasToken = !!token
      if (this.hasToken) {
        this.user = token
        return true
      } else {
        return false
      }
    },
    toHome() {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
    },
    toProblemSet() {
      if (this.$route.path !== '/problemset') {
        this.$router.push('/problemset')
      }
    },
    toStatus() {
      if (this.$route.path !== '/status') {
        this.$router.push('/status')
      }
    },
    toAbout() {
      if (this.$route.path !== '/about') {
        this.$router.push('/about')
      }
    },
    toRegister() {
      if (this.$route.path !== '/register') {
        this.$router.push('/register')
      }
    },
    toLogin() {
      if (this.$route.path !== '/login') {
        this.$router.push('/login')
      }
    },
    toUser() {
      if (this.$route.path !== '/user') {
        this.$router.push('/user')
      }
    },
    logout() {
      console.log('dengchu')
      window.sessionStorage.clear()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.status_box {
  width: 1300px;
  height: 600px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -45%);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.3);
}

.centered-text {
  display: flex;
  align-items: center; /* 在垂直方向上居中 */
  justify-content: center; /* 在水平方向上居中 */
  height: 100%; /* 使高度充满整个单元格 */
}
.ProblemName {
  display: flex;
  align-items: center; /* 在垂直方向上居中 */
  justify-content: center; /* 在水平方向上居中 */
  height: 100%; /* 使高度充满整个单元格 */
  cursor: pointer;
  color: #2d8cf0;
}
</style>
