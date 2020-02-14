import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import App from './App'
import router from './router'
import store from './store'
import './assets/scss/base.scss'
import mixins from './mixins'
import requireComponent from './components'

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  Vue.component(componentConfig.default.name, componentConfig.default || componentConfig)
})

Vue.http = Vue.prototype.$http = axios
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.mixin(mixins)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
