'use strict'
/* eslint-disable */

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
import localFile from './utils/localFile';

const path = require('path')
const fs = require('fs');


if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray = null
const isDevelopment = process.env.NODE_ENV !== 'production'


protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

app.on('ready', () => {
  createWindow()
  createTray()
  sendMess()
  bindIpc()
  localFile.init()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

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
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createTray () {
  tray = new Tray(path.join(__static, './icons/icon.ico'))
  tray.setToolTip('听吗')
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', icon: path.join(__static, './icons/exit.png'), role: 'quit' }
  ])
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show()
    } else {
      createWindow();
    }
  })
}

function sendMess () {
  mainWindow.webContents.on('did-finish-load', function () {
    localFile.read('user.json', function (data) {
      mainWindow.webContents.send('vuex-data', {
        action: 'User/set_user',
        data
      })
    })
  })
}

function bindIpc() {
  ipcMain.on('login', (e, { broadcast, writeFile, data }) => {
    console.log(broadcast, writeFile)
    broadcast &&mainWindow.webContents.send(broadcast, data)
    writeFile && localFile.write(`${writeFile}.json`, JSON.stringify(data))
  })
}

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


