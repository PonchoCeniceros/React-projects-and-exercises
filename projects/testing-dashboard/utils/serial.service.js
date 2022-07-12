const {SerialPort} = require('serialport');
serialPort = null;

/**
 *
 */
const listPorts = async callback => {
  if (serialPort === null) {
    await SerialPort.list().then((ports, err) => {
      if (err) {
        callback({
          error: true,
          message: 'Error obteniendo la lista de puertos',
          data: err,
        });
      } else {
        callback({
          error: false,
          message: 'Lista de puertos obtenida correctamente',
          data: ports,
        });
      }
    });
  } else {
    callback({
      error: true,
      message: 'Actualmente se tiene una conexión abierta',
      data: {},
    });
  }
};

/**
 *
 */
const connect = async (params, callback) => {
  if (serialPort === null) {
    try {
      serialPort = new SerialPort({
        path: params.portName,
        baudRate: params.baudRate,
        autoOpen: false,
      });

      serialPort.open(err => {
        if (err) {
          callback({
            error: true,
            message: 'Error abriendo el puerto',
            data: err,
          });
        } else {
          callback({
            error: false,
            message: 'Éxito abriendo el puerto ' + params.portName,
            data: {},
          });
        }
      });
    } catch (error) {
      callback({
        error: true,
        message: 'No se pudo crear la conexión',
        data: error,
      });
    }
  } else {
    callback({
      error: true,
      message:
        'No se puede conectar porque actualmente se tiene una conexión abierta',
      data: {},
    });
  }
};

/**
 *
 */
const connectAndListen = async (params, callback, eventCallback) => {
  if (serialPort === null) {
    try {
      serialPort = new SerialPort({
        path: params.portName,
        baudRate: params.baudRate,
        autoOpen: false,
      });

      serialPort.open(err => {
        if (err) {
          callback({
            error: true,
            message: 'Error abriendo el puerto',
            data: err,
          });
        } else {
          callback({
            error: false,
            message: 'Éxito abriendo el puerto ' + params.portName,
            data: {},
          });
        }
      });

      serialPort.on('open', function() {
        serialPort.on('data', data => {
          let payload = JSON.parse(JSON.stringify(data)).data;
          eventCallback({
            error: false,
            message: 'Nuevos datos recibidos',
            data: String.fromCharCode(...payload),
          });
        });
      });
    } catch (error) {
      callback({
        error: true,
        message: 'No se pudo crear la conexión',
        data: error,
      });
    }
  } else {
    callback({
      error: true,
      message:
        'No se puede conectar porque actualmente se tiene una conexión abierta',
      data: {},
    });
  }
};

/**
 *
 */
const serialEvent = async callback => {
  serialPort.on('open', function() {
    serialPort.on('data', data => {
      let payload = JSON.parse(JSON.stringify(data)).data;
      callback({
        error: false,
        message: 'Nuevos datos recibidos',
        data: String.fromCharCode(...payload),
      });
    });
  });
};

/**
 *
 */
const write = async (data, callback) => {
  if (serialPort === null) {
    callback({
      error: true,
      message: 'No se tiene una conexión abierta',
      data: {},
    });
  } else {
    try {
      serialPort.write(data);
      callback({
        error: false,
        message: 'Éxito escribiendo',
        data: {},
      });
    } catch (error) {
      callback({
        error: true,
        message: 'Error escribiendo',
        data: error,
      });
    }
  }
};

module.exports = {
  listPorts,
  connect,
  connectAndListen,
  serialEvent,
  write,
};
