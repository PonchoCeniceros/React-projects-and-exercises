// Módulos para controlar la vida de la aplicación y crear una ventana de navegador nativa
const {app, ipcMain, BrowserWindow} = require('electron');
const axios = require('axios');
const path = require('path');
const url = require('url');

const dimensions ={
  width: 1024,
  height: 646 /* 512px + 71px (header) + 35px (panel) + 28px (offset) */,
}

function createWindow() {
  // instanciar la browser window.
  const mainWindow = new BrowserWindow({
    title: 'Generador de registros rápidos de producción',
    width: dimensions.width,
    height: dimensions.height,
    minWidth: dimensions.width,
    minHeight: dimensions.height,
    maxWidth: dimensions.width,
    maxHeight: dimensions.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  
  const appUrl = url.format({
        pathname: path.join(`${__dirname}`.replace('/src', ''), "build/index.html"),
        protocol: "file:",
        slashes: true,
      })

  mainWindow.loadURL(appUrl);
  
  // abrir las DevTools.
  // mainWindow.webContents.openDevTools();
}

//
// servicios de electron disponibles para el proyecto
//
ipcMain.on('exsim-api-post', (event, params) => {
  const data = {
    _parameters: [params.rrp, 'App', params.database, params.token],
  };

  axios
    .post(
      `http://${params.ip}:${params.port}/exsim/GestionManufactura/Metodo/RegistrarRRP`,
      data,
    )
    .then(resp => event.reply('exsim-api-response', resp.data))
    .catch(err => event.reply('exsim-api-response', 'Error en la comunicación con la API'));
});

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.n
