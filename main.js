const path = require('path');
const electron = require('electron');
const isDev = require('electron-is-dev');

const { app, BrowserWindow } = electron;

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (!isDev) {
    win.loadFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  }

  win.removeMenu();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

app.on('ready', createWindow);
