// Módulos para controlar la vida de la aplicación y
// crear una ventana de navegador nativa
require('dotenv').config();
const {app, ipcMain, BrowserWindow} = require('electron');
const SerialService = require('./utils/serial.service');
const path = require('path');
const url = require('url');
const nodemailer = require('nodemailer');
// const {PythonShell} = require('python-shell');

/**
 * inter-process communication
 */
ipcMain.on('init-test', (event, response) => {
  SerialService.connectAndListen(
    {
      portName: process.env.DEVICE_PORT,
      baudRate: parseInt(process.env.DEVICE_BAUDRATE),
    },
    response => {
      event.reply('connection-response', response);
    },
    response => {
      event.reply('serial-event', response);
    },
  );
});

/**
 * instanciar ventana
 */
function createWindow() {
  // instanciar la browser window.
  const mainWindow = new BrowserWindow({
    title: 'Generador de registros rápidos de producción',
    width: parseInt(process.env.APP_WIDTH),
    height: parseInt(process.env.APP_HEIGHT),
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const appUrl =
    process.env.NODE_ENV === 'production'
      ? url.format({
          pathname: path.join(
            `${__dirname}`.replace('/src', ''),
            'build/index.html',
          ),
          protocol: 'file:',
          slashes: true,
        })
      : 'http://localhost:3000/';
  mainWindow.loadURL(appUrl);
  mainWindow.setMenu(null);

  // abrir las DevTools.
  /* process.env.NODE_ENV !== 'production' && */ mainWindow.openDevTools();
}

// seleccionar el idioma de la aplicación
app.commandLine.appendSwitch('lang', 'es');

// la aplicación está inicializada y lista para crear ventanas de navegador.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function() {
    // en macOS, es común volver a crear una ventana en la aplicación cuando
    // se hace clic en el icono del muelle y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Salga cuando todas las ventanas estén cerradas, excepto en macOS.
// Allí, es común que las aplicaciones y su barra de menú permanezcan
// activas hasta que el usuario sale explícitamente con Cmd + Q.
app.on('window-all-closed', function() {
  // if (process.platform !== 'darwin') app.quit();
  app.quit();
});
