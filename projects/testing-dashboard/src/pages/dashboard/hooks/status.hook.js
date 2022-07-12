import {useState} from 'react';

const useStatus = _ => {
  const initialState = {
    mainBanner: 'coloque una tablilla',
    snBanner: 'sin número de serie',
  };
  const [status, updateStatus] = useState(initialState); // eslint-disable-line
  const initTesting = serialNumber => {
    return status => ({
      ...status,
      ...{
        mainBanner: 'Prueba en ejecución',
        snBanner: `número de serie: ${serialNumber}`,
      },
    })
  };

  return [status, updateStatus, {initTesting}];
};

export default useStatus;