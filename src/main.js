import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Axios from 'axios'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);
 

Vue.config.productionTip = false

Vue.prototype.$axios = Axios;

// Axios.defaults.baseURL='/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  router,
  Axios,
  render: h => h(App),
}).$mount('#app')
