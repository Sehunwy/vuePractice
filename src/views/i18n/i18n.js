import Vue from 'vue'

console.log(Vue)

export function doI18n(code, params) {
  var data = {}
  if (params) {
      for (var i = 0; i < params.length; i++) {
          data[i] = params[i]
      }
  }
  return Vue.$t('m.'+code, data)
}

export function setLanguage() {
  var language = navigator.language ? navigator.language : navigator.browserLanguage,
      str;
  if (language.indexOf("zh") > -1) {
      str = "zh";
  } else {
      str = "en";
  }
  window.sessionStorage.setItem('language', str);
  return str;
} 