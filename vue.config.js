'use strict'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
	assetsDir: 'static',
	parallel: false,
	publicPath: './',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },

}
