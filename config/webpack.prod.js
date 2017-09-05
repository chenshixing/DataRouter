/**
 * 生产构建配置
 */
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = commonConfig.root; // 项目根目录
const DIST_PATH = path.join(ROOT_PATH, 'dist'); // 产出路径
const SRC_PATH = path.join(ROOT_PATH, 'src'); // 源码目录
module.exports = Object.assign(commonConfig, {
    cache: false,
    entry: {
        app: './entries/app.js',
        lib: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux',path.join(SRC_PATH, 'utils')]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: SRC_PATH,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [
                        "transform-decorators-legacy",
                        //"transform-flow-strip-types",  //强类型
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
    plugins: commonConfig.plugins.concat([
        // 配置全局常量
        new webpack.DefinePlugin({
            'process.env': { // React/Redux打包常用
                NODE_ENV: JSON.stringify('production')
            },
            __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
        }),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小（for [hash] or [chunkhash]）
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 删除重复或者相似的文件
        new webpack.optimize.DedupePlugin(),
        // 最优合并，以平衡请求大小比例
        //new webpack.optimize.AggressiveMergingPlugin(),
        // 清空dist目录
        new CleanWebpackPlugin([DIST_PATH], {
            root: ROOT_PATH
        }),
        // 压缩js/css
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,  // 最紧凑的输出
            comments: false, // 删除所有的注释
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true
            },
        }),
        new webpack.NoErrorsPlugin(),
    ])
});