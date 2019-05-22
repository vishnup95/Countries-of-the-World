import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios';
import router from './router';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
