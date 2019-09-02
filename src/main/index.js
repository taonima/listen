'use strict';

import { app, BrowserWindow, Tray, Menu } from 'electron';
import '../renderer/store';
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 670,
    width: 1022,
    resizable: false,
    frame: false
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
let tray = null;
function createTray () {
  tray = new Tray(path.join(__dirname, '../../build/icons/icon.ico'));
  tray.setToolTip('听吗');
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', icon: path.join(__dirname, '../../build/icons/exit.png'), role: 'quit' }
  ]);
  tray.setContextMenu(contextMenu);
}

app.on('ready', () => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
