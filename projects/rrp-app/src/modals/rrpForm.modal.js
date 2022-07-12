import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'assets/modals/base.modal.css';
import 'assets/modals/rrpForm.modal.css';
import removeCard from 'assets/imgs/removeCard.png';
import {isNaturalNumber, isSetupDateValid} from 'services/utils/validations.utils';
import {failToast} from 'services/utils/toasts.utils';

/**
 * children (opcional) — El componente que React va a renderizar.
 * hide — Función que va a invocar cuando se le dé click a X(cerrar).
 * isOpen — Booleano que nos va a servir para saber si debemos renderizar o no el componente Modal.
 */
const RRPForm = props => {
  /**
   * Hooks
   */
  const [rrpData, setRrpData] = useState({
    workId: '',
    items: '',
    description: '',
    setupStart: '',
    setupEnd: '',
  });

  /**
   * métodos del componente
   */
  const validateRrpFields = event => {
    event.preventDefault();
    
    if (
      rrpData.setupStart === '' || rrpData.setupEnd === ''
    ) { 
      failToast('Los campos de setup no pueden estar vacíos');
      return;
    }

    if (
      !isSetupDateValid(rrpData.setupStart, rrpData.setupEnd)
    ) { 
      failToast('La fecha de inicio de setup no puede ser mayor a la fecha de terminación');
      return;
    }

    if (
      rrpData.workId === '' ||
      rrpData.items === '' ||
      !isNaturalNumber(rrpData.workId) ||
      !isNaturalNumber(rrpData.items)
    ) {
      failToast('Los campos ingresados son inválidos');
      return;
    }
    props.onSubmit(rrpData);
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
            <h3>Parámetros para la construcción de RRP</h3>
          </div>
          <div className="device-delete-button">
            <button className="delete-button" onClick={props.hide}>
              <img src={removeCard} alt="" />
            </button>
          </div>
        </div>
        <form
          className="rrp-modal-container"
          id="rrp-form"
          onSubmit={validateRrpFields}>
          <div className="rrp-modal-half-col">
            <label>Número de trabajo*</label>
            <div>
              <input
                type="number"
                id="work-id"
                name="work-id"
                placeholder="ingresa un número de trabajo válido"
                value={rrpData.workId}
                onChange={event =>
                  setRrpData(rrpData => ({
                    ...rrpData,
                    ...{workId: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-half-col">
            <label>Productos a elaborar*</label>
            <div>
              <input
                type="number"
                id="items"
                name="items"
                placeholder="ingresa el número de elementos"
                value={rrpData.items}
                onChange={event =>
                  setRrpData(rrpData => ({
                    ...rrpData,
                    ...{items: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-full-col">
            <label>Descricpción</label>
            <div>
              <textarea
                id="description"
                name="description"
                rows="5"
                cols="30"
                placeholder="Ingrese una descripción opcional detallada del proceso"
                value={rrpData.description}
                onChange={event =>
                  setRrpData(rrpData => ({
                    ...rrpData,
                    ...{description: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-half-col">
            <label>Inicio del setup</label>
            <div>
              <input
                type="datetime-local"
                id="setup-start"
                name="setup-start"
                value={rrpData.setupStart}
                onChange={event =>
                  setRrpData(rrpData => ({
                    ...rrpData,
                    ...{setupStart: event.target.value},
                  }))
                }
              />
            </div>
          </div>
          <div className="rrp-modal-half-col">
            <label>Terminación del setup</label>
            <div>
              <input
                type="datetime-local"
                id="setup-end"
                name="setup-end"
                value={rrpData.setupEnd}
                onChange={event =>
                  setRrpData(rrpData => ({
                    ...rrpData,
                    ...{setupEnd: event.target.value},
                  }))
                }
              />
            </div>
          </div>
        </form>
        <div className="rrp-modal-container">
          <div className="rrp-modal-half-col" />
          <div className="rrp-modal-half-col">
            <button className="rrp-modal-button" type="submit" form="rrp-form">
              iniciar proceso
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default RRPForm;
