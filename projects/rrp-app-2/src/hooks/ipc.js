import {useEffect} from 'react';

const useIPC = (ipc, channel, callback) => {

  useEffect(() => {
    ipc.on(channel, (event, response) => {
      callback(event, response);
    });
    
    return () => {
      ipc.removeAllListeners(channel);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export { useIPC };