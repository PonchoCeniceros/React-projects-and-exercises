import React, {useContext, useEffect, useState} from 'react';
import { IpcContext } from 'contexts/ipc.context';
import useIPC from 'hooks/ipc.hook';
import useProcess from './hooks/process.hook';

const ProcessButton = ({startTest, testHaveFinished, allTestHaveFinished}) => {
  const ipcService = useContext(IpcContext);
  const [status, state, update] = useProcess();
  const response = useIPC(ipcService, 'serial-event');
  const connection = useIPC(ipcService, 'connection-response');
  
  /**
   * conexión con la tablilla
   */
  useEffect(_ => {
    if (connection) {
      if (!connection.error) {
        /* Hardcored data */ const resp = { serialNumber: '87654321' }
        update(state.IN_PROCESS);
        startTest(resp);
      }
    }
  }, [connection]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * recepción de la información proporcionada por la tablilla
   */
  /**
   * @todo este state es sólo de prueba, retirar cuando no se ocupe
   */
  const [count, setCount] = useState(1);
  
  useEffect(_ => {
    if (response) {
      /**
       * @todo sustituir count por response.data
       */
      switch (count) {
        case 1:
          /**
           * @todo aplicar la siguiente lógica
           * (1) marcar el test en cuestión como OK ó FAIL
           * (2) indicar al dashboard el resultado del test
           * 
           * ° se repite para cada caso del switch
           */
          testHaveFinished('test1');  
          setCount(count + 1);
          break;

        case 2:
          testHaveFinished('test2');  
          setCount(count + 1);
          break;
        
        case 3:
          testHaveFinished('test3');  
          setCount(count + 1);
          break;

        case 4:
          testHaveFinished('test4');  
          setCount(count + 1);
          break;

        case 5:
          testHaveFinished('test5');  
          setCount(count + 1);
          break;

        case 6:
          testHaveFinished('test6');  
          setCount(count + 1);
          break;

        default:
          /**
           * (1) el comando recibido no es válido
           */
          break;
      }
    
      /**
       * @todo definir la condición real para determinar que todas las
       * pruebas han finalizado
       */
      if (count === 7) {
        console.log("terminamos!");
        setCount(100); // valor sentinela
        allTestHaveFinished();
      }
    
    }
  }, [response]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className="bg-[#EEEEF0] flex py-3">
      <div className="flex-1 flex justify-center">
        <button
          className="bg-[#DDDDDD] border-2 border-[#A3A3A3] rounded-md hover:bg-[#A3A3A3] w-11/12"
          onClick={ _ => ipcService.send('init-test')}
        >
          {status}
        </button>
      </div>
    </div>
  );
};

export default ProcessButton;