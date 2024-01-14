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
        <div class="box_title">结果解释</div>
        <p class="problem_text">编译失败 : 无法编译您的源代码，点击链接查看编译器的输出。</p>
        <p class="problem_text">答案正确 : 你的解题方法是正确的。</p>
        <p class="problem_text">答案错误 : 你的程序输出结果与判题程序的答案不符。</p>
        <p class="problem_text">运行时错误 : 您的程序异常终止，可能的原因是：段错误，被零除或用非0的代码退出程序。</p>
        <p class="problem_text">运行超时 : 您的程序使用的 CPU 时间已超出限制。</p>
        <div style="height:30px"></div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    this.checkToken()
    setTimeout(() => {
      this.show = true
    }, 100)
  },
  data() {
    return {
      pics: [
        { backgroundImage: '../assets/1.png' },
        { backgroundImage: '../assets/2.png' },
        { backgroundImage: '../assets/3.png' },
        { backgroundImage: '../assets/4.png' }],
      hasToken: false,
      show: false,
      user: ''
    }
  },
  methods: {
    checkToken() {
      const token = sessionStorage.getItem('username')
      this.hasToken = !!token
      if (this.hasToken) this.user = token
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
<style scoped>
.el-carousel__item:nth-child(n) {
  background-color: #99a9bf;
}

.scaled-image {
  width: 100%; /* 让图片宽度充满容器 */
  height: 700px; /* 让图片高度充满容器 */
}
.problem_text {
  line-height: 20px;
  margin-bottom: 10px;
  margin-left: 40px;
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
</style>
