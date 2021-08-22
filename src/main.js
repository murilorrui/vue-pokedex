import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App.vue';
import './registerServiceWorker';
import './shared/styles/main.scss';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  InfiniteLoading,
  render: (h) => h(App),
}).$mount('#app');
