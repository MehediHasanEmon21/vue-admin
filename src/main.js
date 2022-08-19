import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Modal from '../src/views/utils/Modal.vue'
import Snackbar from '../src/views/utils/Snackbar.vue'
import axios from './plugins/axios';
import { store } from './store/index.js'
import authMixin from './mixin/auth.js'

Vue.mixin(authMixin);
Vue.component('modal', Modal)
Vue.component('snackbar', Snackbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
