'use strict'
/* eslint-disable */

import { app, protocol, BrowserWindow, Tray, Menu } from 'electron'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'

const path = require('path')
console.log(process.env.WEBPACK_DEV_SERVER_URL)

if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

console.log(__dirname)
let mainWindow
let tray = null
const isDevelopment = process.env.NODE_ENV !== 'production'


protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 680,
    width: 1032,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
  // mainWindow.webContents.closeDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  console.log(__static)
  tray = new Tray(path.join(__static, './icons/icon.ico'))
  tray.setToolTip('听吗')
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', icon: path.join(__static, './icons/exit.png'), role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.show()
  })
}

app.on('ready', () => {
  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  console.log('window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
