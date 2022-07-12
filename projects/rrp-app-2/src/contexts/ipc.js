import { createContext } from 'react';
import IPCService from 'services/ipc';

const IpcContext = createContext();

const IpcContextProvider = props => {
  return (
    <IpcContext.Provider value={new IPCService()}>
      {props.children}
    </IpcContext.Provider>
  );
};

export {
    IpcContext,
    IpcContextProvider,
};