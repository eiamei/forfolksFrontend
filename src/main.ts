import Vue from 'vue';
import App from './App.vue';
import VeeValidate from 'vee-validate';

import router from './services/Router';
import store from './services/Store';

import i18n from './services/Translation/i18n';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
