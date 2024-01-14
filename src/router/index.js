import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginDemo from '../components/LoginDemo.vue'
import ProblemSet from '../components/ProblemSet.vue'
import ProblemContnent from '../components/ProblemContent.vue'
import RegisterDemo from '../components/RegisterDemo.vue'
import HomePage from '../components/HomePage.vue'
import UserPage from '../components/UserPage.vue'
import SubmissionDetails from '../components/SubmissionDetails.vue'
import AboutPage from '../components/AboutPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/problemset/:problemId',
    component: ProblemContnent
  },
  {
    path: '/status',
    component: SubmissionDetails
  },
  { path: '/', redirect: '/problemset' },
  { path: '/login', component: LoginDemo },
  { path: '/problemset', component: ProblemSet },
  { path: '/register', component: RegisterDemo },
  { path: '/home', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/user', component: UserPage }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
