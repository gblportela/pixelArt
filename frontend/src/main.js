import { createApp } from 'vue'
import App from './App.vue'


import store from './config/store'
import router from './config/router'
import './config/axios'

import './config/axios.js'

const Vue = createApp(App);

Vue.use(router);
Vue.use(store);
Vue.mount('#app');