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
    <transition name="el-zoom-in-top">
      <div v-show="show"
           class="problem_box">
        <div class="box_title">{{problem.name}}</div>

        <h2>题目描述</h2>
        <div class="md"
             v-html="renderedMarkdown"> </div>

        <h2>样例输入</h2>
        <p class="problem_text">{{problem.sampleInput}}</p>

        <h2>样例输出</h2>
        <p class="problem_text">{{problem.sampleOutput}}</p>
        <div style="height:30px"></div>
      </div>
    </transition>
    <div v-show="show"
         class="code_container">
      <div class="editor">
        <el-select v-model="value"
                   style="margin-bottom:10px"
                   placeholder="请选择语言">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>

        <vue-monaco-editor v-model="code"
                           theme="vs-dark"
                           language="cpp"
                           @change="saveCode" />
        <el-button @click="submit"
                   type="warning"
                   style="margin-top:10px"
                   class="btns">提交</el-button>
        <el-button @click="checkStatus"
                   style="float:right;margin-top:10px"
                   round
                   :class="{greenBtn:judgeResult==='ACCEPTED', redBtn:judgeResult!=='ACCEPTED', whiteBtn:judgeResult==='评测结果'}">{{judgeResult}}</el-button>

      </div>
    </div>
    <div style="height:30px"></div>
  </div>
</template>
<script>
import { marked } from 'marked'
export default {
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 100)
  },
  created() {
    this.checkToken()
    this.getProblem()
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: 'C++'
      }],
      ken: false,
      user: '',
      show: false,
      value: '选项1',
      value2: '',
      code: '#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    //Give your code here\n    return 0;\n}',
      judgeResult: '评测结果',
      problem: {
        description: '',
        name: '',
        id: '',
        sampleInput: '',
        sampleOutput: ''
      }
    }
  },
  methods: {
    getCode() {
      const latestCode = sessionStorage.getItem('latest' + this.problem.id.toString())
      if (latestCode) { this.code = latestCode }
    },
    saveCode() {
      sessionStorage.setItem('latest' + this.problem.id.toString(), this.code)
    },
    async submit() {
      if (this.checkToken() === false) return this.$message.error('请先登录')
      const submission = { problemId: this.problem.id, userId: sessionStorage.getItem('userId'), code: this.code }
      console.log(submission)
      const { data: result } = await this.$http.post('oj/', submission)
      if (result.judgeCode === 'ACCEPTED') { this.$message.success('答案正确') } else { this.$message.error(result.msg) }
      this.judgeResult = result.judgeCode
    },
    async getProblem() {
      const { data: result } = await this.$http.get('prob/id/' + this.$route.params.problemId)
      this.problem = result.problem
      this.getCode()
    },
    checkStatus() {
      const oneQuery = { userID: sessionStorage.getItem('userId'), probID: this.problem.id }
      const queryString = new URLSearchParams(oneQuery).toString()
      this.$router.push('/status?' + queryString)
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
  },
  computed: {
    renderedMarkdown() {
      // 使用 marked 处理 Markdown 文本

      this.problem.description.replace(/\n/g, '<br/>')
      console.log(this.problem.description)
      return marked.parse(this.problem.description.replace(/\n/g, '<br/>'))
    }
  }
}
</script>

<style lang="less" scoped>
.editor {
  margin-top: 5px;
  height: 300px;
}
.code_container {
  position: relative;
  width: 81.5%;
  margin-left: 8%;
  margin-top: 80px;
  height: 400px;
  min-height: min-content;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.3);
  padding: 20px 20px;
}
.problem_box {
  position: relative;
  top: 35px;
  left: 8%;
  width: 84%;
  min-height: min-content;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.3);
}
.greenBtn {
  color: #fff;
  background-color: #19be6b;
  width: 250px;
}
.redBtn {
  color: #fff;
  background-color: red;
  width: 250px;
}
.whiteBtn {
  color: black;
  background-color: white;
  width: 250px;
  border: 2px solid #ababab;
}

.h1,
h2,
h3 {
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative;
  margin: 16px 0 8px;
  margin-left: 20px;
  padding: 0;
}
.problem_text {
  line-height: 20px;
  margin-bottom: 10px;
  margin-left: 40px;
}
.md {
  margin-left: 40px;
}
</style>
