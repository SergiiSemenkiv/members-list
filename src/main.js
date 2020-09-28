import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'materialize-css';

Vue.config.productionTip = false;

Vue.filter('showFullName', (member) => {
  const { firstname = '', lastname = '' } = member;
  return `${firstname} ${lastname}`;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
