import Vue from 'vue'
import App from './App.vue'
import Router from './Router.js'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios, BootstrapVue)
Vue.config.productionTip = false


new Vue({
router: Router,
  render: h => h(App),
}).$mount('#app')
