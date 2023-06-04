import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'


// 樣式重置
import "reset-css";

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
