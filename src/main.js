import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueMonacoEditorPlugin)
axios.defaults.baseURL = 'http://82.156.12.72:8080/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
