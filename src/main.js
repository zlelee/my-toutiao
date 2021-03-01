import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import './style/index.less'
// 引入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 设置 rem 基准值的包
import 'amfe-flexible'

import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
