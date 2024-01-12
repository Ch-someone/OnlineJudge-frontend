<template>
  <div class="problemset_container">
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
          <el-dropdown-item @click.native="toUser">个人主页</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout"
                            divided>登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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

<style lang="less" scoped>
.navbar {
  background-color: #333;
  overflow: hidden;
}

.navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 17px 16px;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: border-bottom 0.3s ease;
  cursor: pointer;
}
.el-dropdown-link {
  font-size: 15px;
  display: block;
  color: white;
  text-align: center;
  padding: 17px 20px;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: border-bottom 0.3s ease;
  cursor: pointer;
}
.navbar p {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 0px 20px;
  text-decoration: none;
  border-bottom: 3px solid transparent;
}
.navbar a:hover {
  border-bottom: 3px solid #ddd;
}
</style>
