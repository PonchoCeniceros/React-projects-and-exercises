import {useEffect, useState} from 'react';

const useIPC = (ipc, channel) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    ipc.on(channel, (event, resp) => {
      setData(resp);
    });
    
    return () => {
      ipc.removeAllListeners(channel);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return data;
};

export default useIPC;
