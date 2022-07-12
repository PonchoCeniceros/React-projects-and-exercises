// Módulos para controlar la vida de la aplicación y crear una ventana de navegador nativa
const {app, ipcMain, BrowserWindow} = require('electron');
const axios = require('axios');
const path = require('path');
const url = require('url');
require('dotenv').config()

/**
 * inter-process communication
 */
ipcMain.on('exsim-api-post', (event, params) => {
  const data = {
    _parameters: [params.rrp, 'App', params.database, params.token],
  };
  
  console.log();
  console.log(params);
  console.log();
  
  axios
    .post(
      `http://${params.ip}:${params.port}/exsim/GestionManufactura/Metodo/RegistrarRRP`,
      data,
    )
    .then(resp => event.reply('exsim-api-response', resp.data))
    .catch(err => {
      console.log(err);
      event.reply('exsim-api-response', 'Error en la comunicación con la API')
    });
});

/**
 * instanciar ventana
 */
function createWindow() {
  // instanciar la browser window.
  const mainWindow = new BrowserWindow({
    title: 'Aplicación de escritorio',
    autoHideMenuBar: true,
    maximizable: false,
    width: parseInt(process.env.APP_WIDTH),
    height: parseInt(process.env.APP_HEIGHT),
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const appUrl = (process.env.NODE_ENV === 'production') ? url.format({
    pathname: path.join(`${__dirname}`.replace('/src', ''), 'build/index.html'),
    protocol: 'file:',
    slashes: true,
  }) : 'http://localhost:3000/';
  mainWindow.loadURL(appUrl);
  mainWindow.setMenu(null);
  // abrir las DevTools.
  process.env.NODE_ENV !== 'production' && mainWindow.openDevTools();
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
  if (process.platform !== 'darwin') app.quit();
});

