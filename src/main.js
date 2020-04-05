import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/custom-ionic.scss'


import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
Vue.use(Ionic);


import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import './registerServiceWorker'
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

import VueOffline from 'vue-offline'
Vue.use(VueOffline)

let bus = new Vue
Vue.prototype.$bus = bus


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
