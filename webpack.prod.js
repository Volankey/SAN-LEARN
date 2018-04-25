  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  // const WorkboxPlugin = require('workbox-webpack-plugin');
     module.exports = merge(common, {
       mode: 'production',
       plugins: [
         new UglifyJSPlugin({
             sourceMap: true
         }),
           // new WorkboxPlugin({
           //     // 这些选项帮助 ServiceWorkers 快速启用
           //     // 不允许遗留任何“旧的” ServiceWorkers
           //     clientsClaim: true,
           //     skipWaiting: true,
           // }),
       ],
       output:{
           publicPath: './'
       }
    
  });