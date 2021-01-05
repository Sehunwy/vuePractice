const path = require("path");
const webpack = require('webpack')

module.exports = {
    //基本路径
    publicPath: './',
    //输出文件目录
    outputDir: 'main',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    indexPath: 'index.html',
    //生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    css: {
        extract: false
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
    lintOnSave: false, //是否使用eslint
    devServer: {
        public: '13.15.11.34:8080',
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/views/less/common.less")]
        }
    },
};