<template>
  <div class="login_container">
    <div class="navbar">
      <p>江苏大学OnlineJudge</p>
      <a @click="toHome">首页</a>
      <a @click="toProblemSet">题目列表</a>
      <a @click="toStatus">评测记录</a>
      <a @click="toAbout">关于</a>
      <a @click="toRegister"
         style="float: right">注册</a>
      <a @click="toLogin"
         style="float: right">登录</a>
    </div>
    <transition name="el-fade-in">
      <div v-show="show"
           class="login_box">
        <div class="welcome">Welcome to JSU-OnlineJudge !</div>
        <el-form :model="registerForm"
                 class="input_box">
          <el-form-item>
            <el-input v-model="registerForm.name"
                      prefix-icon="el-icon-user-solid"
                      placeholder="请输入用户名, 50个字符以内"
                      class="login_form"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerForm.pwd"
                      type="password"
                      prefix-icon="el-icon-lock"
                      placeholder="请输入密码"
                      class="login_form"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="password2"
                      type="password"
                      prefix-icon="el-icon-lock"
                      placeholder="请再次输入密码以确认"
                      class="login_form"></el-input>
          </el-form-item>
          <el-button @click="register"
                     type="primary"
                     class="btns">注册</el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 50)
  },
  created() {
    this.checkToken()
  },
  data() {
    return {
      show: false,
      password2: '',
      registerForm: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    checkToken() {
      const token = sessionStorage.getItem('username')
      if (token) {
        this.$router.push('/user')
      }
    },
    affirmPassword() {
      if (this.registerForm.pwd === this.password2) return true
      else return false
    },
    async register() {
      if (this.affirmPassword() === false) return this.$message.error('两次输入密码不一致')
      const { data: result } = await this.$http.post('user/register', this.registerForm)
      if (result.code !== 0) return this.$message.error(result.msg)
      this.$message.success('注册成功，将为您自动登录…')
      window.sessionStorage.setItem('username', this.registerForm.name)
      this.$router.push('/home')
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
.login_box {
  width: 500px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.welcome {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 32.5%;
  letter-spacing: 1px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.input_box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  height: 25%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.login_form {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 25%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.btns {
  position: absolute;
  width: 80%;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
