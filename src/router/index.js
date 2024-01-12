import Vue from 'vue'
import Router from 'vue-router'
import LoginDemo from '../components/LoginDemo.vue'
import ProblemSet from '../components/ProblemSet.vue'
import RegisterDemo from '../components/RegisterDemo.vue'
import HomePage from '../components/HomePage.vue'
import UserPage from '../components/UserPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/problemset' },
    { path: '/login', component: LoginDemo },
    { path: '/problemset', component: ProblemSet },
    { path: '/register', component: RegisterDemo },
    { path: '/home', component: HomePage },
    { path: '/user', component: UserPage }
  ]
})
