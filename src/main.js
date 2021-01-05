import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui';
import { formValid } from './views/lib/validate/validate';
import { setLanguage } from './views/js/common'
import "./assets/http.js"
import axios from "axios"
// import "./views/js/theme"
// import '../theme/index.css'
Vue.use(ElementUI);
Vue.use(VueI18n) // 通过插件的形式挂载
Vue.prototype.doI18n = doI18n;
Vue.prototype.formValid = formValid;
Vue.prototype.axios = axios;
Vue.config.productionTip = false
var locale = setLanguage();

const i18n = new VueI18n({
  locale: locale,    // 语言标识
  messages: {
    'zh': Object.assign(require('@/views/i18n/zh.json'), require('@/views/i18n/zh copy.json')),   // 中文语言包
    'en': Object.assign(require('@/views/i18n/en.json'), require('@/views/i18n/en copy.json'))   // 英文语言包
  },
})

function doI18n(code, params) {
  var data = {}
  if (params) {
    for (var i = 0; i < params.length; i++) {
      data[i] = params[i]
    }
  }
  return i18n.t( code, data)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
