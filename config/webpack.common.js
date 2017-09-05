/**
 * 公用构建配置
 */
const path = require('path');
const webpack = require('webpack');
// 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
// 目录
const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
// 网站信息
const info = require('./info');
module.exports = {
    root: ROOT_PATH,
    context: SRC_PATH,
    output: {
        path: path.join(ROOT_PATH, 'dist'),
        filename: 'js/[name].[hash:4].js',
        chunkFilename: 'js/[name].[chunkhash:5].js',
        publicPath: `${info.base.name}`
    },
    resolve: {
        root: path.join(ROOT_PATH, 'node_modules'), // 指定模块根目录
        extensions: ['', '.js', '.jsx'], // 为区分css/less模块，只有js(x)模块可以省略后缀
        alias: {
            // 自定义路径别名，大写用于区别NPM模块
            ASSETS: path.join(SRC_PATH, 'assets'),
            PAGES: path.join(SRC_PATH, 'pages'),
            COM: path.join(SRC_PATH, 'components'),
            BCOM: path.join(SRC_PATH, 'business_components'),
            ACTION: path.join(SRC_PATH, 'actions'),
            REDUCERS: path.join(SRC_PATH, 'reducers'),
            STATIC: path.join(SRC_PATH, 'static'), //全局静态变量
            UTILS: path.join(SRC_PATH, 'utils'),
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: 'lib',
                filename: 'js/lib.js',
                minChunks: Infinity
            }
        ),
        new HtmlWebpackPlugin({
            title: info.app.title,
            description: info.app.description,
            keywords: info.app.keywords,
            version:process.env.npm_package_version,
            template: path.join(SRC_PATH, 'entries/app.html'),
            filename: 'index.html', // 生成的html文件 
            chunks: ['app', 'lib'],
            favicon: path.join(SRC_PATH, 'assets/favicon.png')
        }),
        new ExtractTextPlugin('css/[name].[hash:4].css', {
            allChunks: true
        })
    ],
    postcss: function() {
        return [autoprefixer]
    },
    externals: [{ // require函数不需要编译的依赖，对应外部变量
        'jquery': 'window.jQuery'
    }]
}
