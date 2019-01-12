import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router';

import router from './Core/Router';
import store from './Core/Store';
import i18n from './Core/Translation/i18n';

Vue.use(Router);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
