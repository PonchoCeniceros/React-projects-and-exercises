class IPCService {
    ipc;
  
    constructor() {
      if (window.require) {
        try {
          this.ipc = window.require("electron").ipcRenderer;
        } catch (e) {
          throw e;
        }
      } else {
        console.warn("Electron IPC was not loaded");
      }
    }
  
    /**
     * Crea una suscripción
     */
    on(channel, listener) {
      if (!this.ipc) {
        return;
      }
      this.ipc.on(channel, listener);
    }
  
    /**
     * Solo un evento
     */
    once(channel, listener) {
      if (!this.ipc) {
        return;
      }
      this.ipc.once(channel, listener);
    }
  
    /**
     * Mandar un evento
     */
    send(channel, ...args) {
      if (!this.ipc) {
        return;
      }
      this.ipc.send(channel, ...args);
    }
  
    /**
     * Quitar todas las suscripciones
     */
    removeAllListeners(channel) {
      if (!this.ipc) {
        return;
      }
      this.ipc.removeAllListeners(channel);
    }
  };
  
  export default IPCService;
  