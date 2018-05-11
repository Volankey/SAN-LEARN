const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
/*
    热更新(HMR)不能和[chunkhash]同时使用。

    output: {
           //filename: '[name].bundle.js',
           filename: '[name].[chunkhash].js',
           path: path.resolve(__dirname, 'dist')
       }
    解决方法：
    1： 如果是开发环境，将配置文件中的chunkhash 替换为hash
    2：如果是生产环境，不要使用参数 --hot
*/
module.exports = {
    entry: {
        app: './src/index.js',
        //依赖
        vendor:['san']

    }, 
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title:"hello world"
          }),


        new CleanWebpackPlugin(['dist']),
        new webpack.HashedModuleIdsPlugin(),
        
        // new webpack.optimize.CommonsChunkPlugin({
        //            name: 'vendor'
        //  }),
        // new webpack.optimize.CommonsChunkPlugin({
        //            name: 'common' // 指定公共 bundle 的名称。
        //  }),
        // new webpack.optimize.CommonsChunkPlugin({
        //            name: 'manifest'
        //  })



    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
                manifest:{
                    chunks:'initial'
                },
                
            }
        }
    },

    module: {

        rules: [
            {
                test: /\.san$/,
                loader: 'san-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    //添加两个presents 使用这两种presets处理js或者jsx文件
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|jpq)$/,
                loader: 'url? limit = 40000'
            }
        ]
    }
}