import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'assets/modals/base.modal.css';
import 'assets/modals/rrpForm.modal.css';
import removeCard from 'assets/imgs/removeCard.png';
import {successToast} from 'services/utils/toasts.utils';

/**
 * children (opcional) — El componente que React va a renderizar.
 * hide — Función que va a invocar cuando se le dé click a X(cerrar).
 * isOpen — Booleano que nos va a servir para saber si debemos renderizar o no el componente Modal.
 */
const APIConfigsForm = props => {
  /**
   * Hooks
   */
  const [apiConfigs, setApiConfigs] = useState({
    ip: '',
    port: '',
    database: '',
    token: '',
  });

  useEffect(() => {
    const configs = JSON.parse(localStorage.getItem('apiConfigs'));
    if (configs) {
      setApiConfigs(apiConfigs => ({
        ...apiConfigs,
        ...{
          ip: configs.ip,
          port: configs.port,
          database: configs.database,
          token: configs.token,
        },
      }));
    }
  }, []);

  /**
   * métodos del componente
   */
  const setAPIConfigs = event => {
    event.preventDefault();
    localStorage.setItem('apiConfigs', JSON.stringify(apiConfigs));
    successToast("Configuraciones actualizadas");
    props.hide();
  };

  /**
   * componente a renderizar
   */
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="rrp-modal modal-container">
        <div className="modal-title">
          <div className="modal-title-info">
            <h3>Configuración de la API</h3>
          </div>
          <div className="device-delete-button">
            <button className="delete-button" onClick={props.hide}>
              <img src={removeCard} alt="" />
            </button>
          </div>
        </div>
        <form
          className="rrp-modal-container"
          id="api-configs-form"
          onSubmit={setAPIConfigs}>
          <div className="rrp-modal-half-col">
            <label>Dirección IP*</label>
            <div>
              <input
                type="text"
                id="api-ip"
                name="api-ip"
                placeholder="0.0.0.0"
                value={apiConfigs.ip}
                onChange={event =>
                  setApiConfigs(apiConfigs => ({
                    ...apiConfigs,
                    ...{ip: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-half-col">
            <label>Puerto*</label>
            <div>
              <input
                type="text"
                id="api-port"
                name="api-port"
                placeholder="0000"
                value={apiConfigs.port}
                onChange={event =>
                  setApiConfigs(apiConfigs => ({
                    ...apiConfigs,
                    ...{port: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-full-col">
            <label>Base de datos*</label>
            <div>
              <input
                type="text"
                id="api-database"
                name="api-database"
                placeholder="Ingresa el nombre de la base de datos"
                value={apiConfigs.database}
                onChange={event =>
                  setApiConfigs(apiConfigs => ({
                    ...apiConfigs,
                    ...{database: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-full-col">
            <label>Token*</label>
            <div>
              <input
                type="text"
                id="api-token"
                name="api-token"
                placeholder="Ingresa el token de acceso"
                value={apiConfigs.token}
                onChange={event =>
                  setApiConfigs(apiConfigs => ({
                    ...apiConfigs,
                    ...{token: event.target.value},
                  }))
                }
              />
            </div>
          </div>
        </form>
        <div className="rrp-modal-container">
          <div className="rrp-modal-half-col" />
          <div className="rrp-modal-half-col">
            <button
              className="rrp-modal-button"
              type="submit"
              form="api-configs-form">
              cargar configuraciones
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default APIConfigsForm;
