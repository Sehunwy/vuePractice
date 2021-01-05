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