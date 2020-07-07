'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const productName = 'test'
const appId = 'com.taonima.app.' + productName
const menuCategory = 'electron-cli3'
const shortcutName = 'cli3-测试'
const port = 9020
module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  // productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        vue$: 'vue/dist/vue.esm.js' // 加上这一句
      }
    }
  },
  devServer: {
    port: port
    //   open: true,
    //   overlay: {
    //     warnings: false,
    //     errors: true
    //   }
  },
  chainWebpack (config) {
    // alias
    config.resolve.alias.set('@', resolve('src'))
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: productName,
        appId: appId,
        directories: {
          output: 'build'
        },
        win: {
          icon: 'public/icons/icon.ico',
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: '${productName}_setup_${version}.${ext}',
          target: ['nsis']
        },
        nsis: {
          oneClick: false,
          menuCategory: menuCategory,
          shortcutName: shortcutName,
          allowToChangeInstallationDirectory: true,
          perMachine: true,
          runAfterFinish: true
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: 'public/icons/icon.icns'
        },
        linux: {
          icon: 'public/icons/icon.ico'
        }
      }
    }
  }
}
