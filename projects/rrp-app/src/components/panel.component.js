import React, {useState} from 'react';
import useModal from 'modals/hooks.modals';
import APIConfigsForm from 'modals/apiConfigs.modal';
import {isValidAddress} from 'services/utils/validations.utils';
import {failToast} from 'services/utils/toasts.utils';
import add from 'assets/imgs/add.png';
import 'assets/components/panel.component.css';
import LoadingSpinner from './spinner.component';

/* @todo implementar un spinner loading
 * https://contactmentor.com/how-to-add-loading-spinner-react-js/
 */

const Panel = props => {
  /**
   * Hooks
   */
  const [device, setDevice] = useState({label: '', ip: ''});
  const [isLoading, setIsLoading] = useState(false);
  const {isOpen, toggle} = useModal();

  /**
   * métodos del componente
   */
  const validateDeviceFields = event => {
    event.preventDefault();
    // validar que:
    // * ip y label no sean vacios
    // * ip sea una dirección valida
    // * ip no se encuentre en la lista de cards generados
    //
    if (device.ip === '' || device.label === '' || !isValidAddress(device.ip)) {
      failToast('Los campos ingresados son inválidos');
    } else {
      // intanciando socket para vincularlo con el device
      const socket = new WebSocket('ws://' + device.ip + ':6432');
      // aqui levantamos el loading wheel
      setIsLoading(true);
      // caundo el socket es creado correctamente, se provee
      // el mismo al componente ppal para crear con el un nuevo device
      socket.onopen = event => {
        // aqui matamos el loading wheel
        setIsLoading(false);
        props.onSubmit(device, socket);
      };
      // manejar la excepción del error de conexión con el socket
      socket.onerror = event => {
        // aqui matamos el loading wheel
        setIsLoading(false);
        failToast('Error de conexión con el dispositivo');
      };
    }
  };

  /**
   * componente a renderizar
   */
  return (
    <div className="panel">
      {isLoading ? <LoadingSpinner /> : <span></span>}

      <form id="device-form" onSubmit={validateDeviceFields}>
        <div className="panel-col">
          <input
            className="panel-input"
            type="text"
            placeholder="ingresa una dirección IP"
            value={device.ip}
            onChange={event =>
              setDevice(device => ({
                ...device,
                ...{ip: event.target.value},
              }))
            }
          />
        </div>
        <div className="panel-col">
          <input
            className="panel-input"
            type="text"
            placeholder="ingresa una etiqueta"
            value={device.label}
            onChange={event =>
              setDevice(device => ({
                ...device,
                ...{label: event.target.value},
              }))
            }
          />
        </div>
      </form>

      <div className="panel-col">
        <button className="panel-button" type="submit" form="device-form">
          <img src={add} alt="" />
          <div>añadir dispositivo</div>
        </button>
      </div>

      <div className="panel-col">
        <button className="panel-button" onClick={toggle}>
          <img src={add} alt="" />
          <div>configuración API</div>
        </button>
      </div>

      <APIConfigsForm isOpen={isOpen} hide={toggle} />
    </div>
  );
};

export default Panel;
