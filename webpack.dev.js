const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
   module.exports = merge(common, {
       devServer: {
           contentBase: './dist',
           port: 8888,
           host:'0.0.0.0',
           compress: true,//压缩,
           hot: true//热替换
       },
       output:{
           filename: '[name].js',
       },
       //调试信息映射
       devtool: 'inline-source-map',
       plugins: [
           //热替换
           new webpack.NamedModulesPlugin(),
           new webpack.HotModuleReplacementPlugin(),
       ]
});