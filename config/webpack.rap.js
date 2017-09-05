/**
 * RAP mock构建配置
 */
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
const HOST = utils.getIP();
const PORT = 8624;
const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
const projectId = 7; //RAP上的projectId
module.exports = Object.assign(commonConfig, {
    devtool: 'cheap-source-map', // 'eval'  生产配置这个： cheap-source-map  测试配置这个：source-map
    entry: {
        app: './entries/app.js',
        lib: ['react', 'react-dom', 'react-router', 'react-redux', 'redux-logger', 'redux-thunk', 'react-cookie', path.join(SRC_PATH, 'utils')] // 统一打包稳定的框架/库
    },
    plugins: commonConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // 配置全局常量
        new webpack.DefinePlugin({
            'process.env': { // React/Redux打包常用
                NODE_ENV: JSON.stringify('development')
            },
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
            __CORS__: false // CORS跨域请求
        })
    ]),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: SRC_PATH,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react', 'react-hmre'],
                    plugins: [
                        "transform-decorators-legacy",
                        // "transform-flow-strip-types",  //强类型
                        ["import", { // 用于 antd 的按需加载 js/css
                            "libraryName": "antd",
                            "style": "css"
                        }]
                    ],
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css!postcss')
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!postcss!less')
            }, {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/, // 这些资源包括在js中import或在css中background url引入都会被处理
                loader: 'url',
                query: {
                    limit: 8192,
                    name: 'assets/[name].[ext]?[hash]'
                }
            }]
    },
    // webpack dev server 配置
    devServer: {
        hot: true,
        inline: true,
        quiet: true, // lets WebpackDashboard do its thing
        noInfo: true,
        host: HOST,
        port: PORT,
        watchOptions: {
            aggregateTimeout: 250,
            poll: 800
        },
        historyApiFallback: true,
        proxy: {
            '/shuyou/*': {
                target: 'http://rap.monster/',
                pathRewrite: {
                    '^/shuyou': `/mockjsdata/${projectId}/shuyou/`
                },
                secure: false,
                changeOrigin: true,
            }
        }
    }
});
