const path = require('path')

module.exports = {
  mode: 'none',
  // 输入路径配置
  entry: path.resolve(__dirname, './src/app.js'),
  // 输出文件名和路径配置
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  // 引入插件配置
  plugins: [],
  // 文件类型转换配置
  module: {}
}