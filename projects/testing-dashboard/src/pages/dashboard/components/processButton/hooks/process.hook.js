import {useState} from 'react';

const useProcess = _ => {
  const state = {
    READY: 'iniciar prueba',
    IN_PROCESS: 'en ejecución...',
    FINISH: 'terminar prueba',
  }
  const [status, update] = useState(state.READY); // eslint-disable-line
  return [status, state, update];
};

export default useProcess;