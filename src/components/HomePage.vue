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
    <div class="block">
      <img src="../assets/pic/1.png"
           alt=""
           class="scaled-image">
    </div>
    <div class="welcome">
      欢迎来到江苏大学OnlineJudge！
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.checkToken()
  },
  data() {
    return {
      pics: [
        { backgroundImage: '../assets/1.png' },
        { backgroundImage: '../assets/2.png' },
        { backgroundImage: '../assets/3.png' },
        { backgroundImage: '../assets/4.png' }],
      hasToken: false,
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
.welcome {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 800px;
  transform: translate(-50%, -50%);
  color: aliceblue;
  font-size: 50px;
  letter-spacing: 3px;
}
.scaled-image {
  width: 100%; /* 让图片宽度充满容器 */
  height: 700px; /* 让图片高度充满容器 */
}
</style>
