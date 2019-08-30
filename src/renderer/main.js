import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import './assets/scss/base.scss';
import './assets/icon.js';
import Icon from './components/Icon.vue';
import Menu from './components/Menu.vue';

Vue.component('Icon', Icon);
Vue.component('Menu', Menu);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app');
