const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
          app1: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
             new HtmlWebpackPlugin({
                   title: 'Output Management'
              }),
             new CleanWebpackPlugin(['dist']),
        //热替换
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        //简化输出js去掉未被引用的代码
        new UglifyJSPlugin()
    ],
    //配合dev-server 监视dist文件夹下的文件变化，自动更新到浏览器
    devServer: {
        contentBase: './dist',
        port: 8000,
        compress: true,//压缩,
        hot: true//热替换
    },
    //调试信息映射
    devtool: 'inline-source-map',
    module: {
         rules: [
            {
                 test: /\.css$/,
                 use: [
                   'style-loader',
                   'css-loader'
                 ]
             },
             {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
                     'file-loader'
                 ]
             }
     ]
    }
};