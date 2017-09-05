/**
 * RAP mock构建配置
 */
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');
// 网站信息
const info = require('./info');
const HOST = utils.getIP();
const PORT = 8624;
const ROOT_PATH = path.resolve(__dirname, '..'); // 项目根目录
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
module.exports = Object.assign(commonConfig, {
    // devtool: 'cheap-source-map',
    devtool: "cheap-module-eval-source-map",
    entry: {
        app: './entries/app.js',
        lib: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux', path.join(SRC_PATH, 'utils')]
    },
    plugins: commonConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // 配置全局常量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            },
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
        }),
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
                            "style": true
                        }],
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
        // publicPath: info.base.name,
        compress: true,
        contentBase: false,
        // https: true,
        host: HOST,
        port: PORT,
        inline: true,
        colors: true,//终端中输出结果为彩色
        hot: true,
        quiet: false, // lets WebpackDashboard do its thing
        noInfo: true,
        // historyApiFallback: true,
        historyApiFallback: {
            index: `${info.base.name}`,
        },
        proxy: {
            '/shuyou/': {
                //target: 'http://10.1.21.18:8080/', //开发环境
                //target: 'http://192.168.9.171:9082', //仲文
                //target: 'http://192.168.9.223:8080', //林飞
                //target: 'http://192.168.9.186:8080', //ZZY
                //target: 'http://10.1.21.12/', //开发环境
                target: 'http://10.1.21.17/', //测试环境
                pathRewrite: {
                    //'^/shuyou': `/mockjsdata/${projectId}/shuyou/`
                },
                secure: false,
                changeOrigin: true,
            }
        }
    }
});
