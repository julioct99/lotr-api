import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './shared/store';

import 'bootstrap/scss/bootstrap.scss';

Vue.config.productionTip = false;
store.init();

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
