import React, {useEffect, useState} from 'react';
import useModal from 'modals/hooks.modals';
import 'assets/components/device.component.css';
import RRPForm from 'modals/rrpForm.modal';
import removeCard from 'assets/imgs/removeCard.png';
import IPCService from 'services/ipc.service';
import RRPService from 'services/rrp.service';
import {
  successToast,
  warningToast,
  failToast,
} from 'services/utils/toasts.utils';

const Device = props => {
  /**
   * Servicio de Inter-Process Communication
   */
  const ipcService = new IPCService();

  /**
   * Servicio de RRP
   */
  const rrpService = new RRPService();

  /**
   * Hooks
   */
  const {isOpen, toggle} = useModal();
  const [process, update] = useState({
    ready: false,
    status: 'conectado',
    banner: 'iniciar proceso',
    params: {},
    count: 0,
  });

  useEffect(() => {
    // el componente ha sido montado
    ipcService.on('exsim-api-response', (event, response) => {
      if (response === 'S') successToast('Información capturada con éxito');
      else if (response === 'Error en la comunicación con la API')
        failToast(response);
      else warningToast(response);
      // reinicar proceso
      update(process => ({
        ...process,
        ...{count: 0, status: 'en proceso...'},
      }));
    });
    // función de saneamiento para desmontar el componente
    return () => {
      ipcService.removeAllListeners('exsim-api-response');
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  /**
   * métodos del componente
   */
  const onDelete = () => {
    props.socket.close();
    props.onDelete(props.ip);
  };

  const getRrpInfo = data => {
    update(process => ({
      ...process,
      ...{
        count: 0,
        ready: true,
        status: 'en proceso...',
        banner: 'nuevo proceso',
        params: {...data, orderDate: new Date()},
      },
    }));
  };

  /**
   * eventos del socket
   */
  props.socket.onclose = event => {
    warningToast('El dispositivo se ha desconectado');
    props.onDelete(props.ip);
  };

  props.socket.onmessage = async msg => {
    if (process.ready) {
      // contabilizando piezas y
      // actualizando en el estado del proceso
      const currentCount = process.count + 1;
      update(process =>
        currentCount === 1
          ? {
              ...process,
              ...{
                count: currentCount,
                status: '1 pieza contabilizada',
                params: {...process.params, ...{start: new Date()}},
              },
            }
          : {
              ...process,
              ...{
                count: currentCount,
                status: `${currentCount} piezas contabilizadas`,
              },
            },
      );

      if (currentCount === parseInt(process.params.items)) {
        const rrpParams = {
          ...process.params,
          ...{end: new Date()},
        };

        update(process => ({
          ...process,
          ...{
            status: 'capturando datos...',
            params: {...process.params, ...rrpParams},
          },
        }));
        const apiConfigs = JSON.parse(localStorage.getItem('apiConfigs'));

        if (apiConfigs === null) {
          failToast(
            'No existen configuraciones para la comunicación con la API',
          );

          // reinicar proceso
          update(process => ({
            ...process,
            ...{count: 0, status: 'en proceso...'},
          }));
        } else {
          ipcService.send('exsim-api-post', {
            rrp: rrpService.encodeRRP(rrpParams),
            ...apiConfigs,
          });
        }
      }
    }
  };

  /**
   * componente a renderizar
   */
  return (
    <div className="device-padding">
      <div className="device-card">
        <div className="device-title">
          <div className="title-info">
            <div className="device-label">{props.label}</div>
            <div className="device-ip">{props.ip}</div>
          </div>
          <div className="device-delete-button">
            <button className="delete-button" onClick={onDelete}>
              <img src={removeCard} alt="" />
            </button>
          </div>
        </div>
        <div className="device-box">
          <div className="status-banner">estado</div>
          <div className="device-status">
            <b>{process.status}</b>
          </div>
          <button className="device-button" onClick={toggle}>
            {process.banner}
          </button>
        </div>
      </div>
      <RRPForm isOpen={isOpen} hide={toggle} onSubmit={getRrpInfo} />
    </div>
  );
};

export default Device;
