import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Axios from 'Axios'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);
 

Vue.config.productionTip = false

Vue.prototype.$axios = Axios;

Axios.defaults.baseURL='/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  Axios,
  render: h => h(App),
}).$mount('#app')
