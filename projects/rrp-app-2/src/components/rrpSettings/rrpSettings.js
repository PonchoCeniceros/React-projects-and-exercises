// react utilities
import ReactDOM from "react-dom";
import React from "react";
import useRRPSettings from "./hooks/rrpSettings";
// styled and assets
import './rrpSettings.css';
import CardHeader from "styled-components/cardHeader";
import { faFile } from "@fortawesome/free-solid-svg-icons";
// dependencies and utilities.
import { failToast } from "utilities/toast";
import { isNaturalNumber, isSetupDateValid } from '../../utilities/validation';

/**
 * children (opcional) — El componente que React va a renderizar.
 * hide — Función que va a invocar cuando se le dé click a X(cerrar).
 * isOpen — Booleano que nos va a servir para saber si debemos renderizar o no el componente Modal.
 */
const RRPSettings = ({isOpen, hide, onSubmit}) => {
  /**
   * Hooks
   */
  const [rrpData, setWorkId, setItems, setIssue, setDescription, setSetupStart, setSetupEnd] = useRRPSettings();

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
    onSubmit(rrpData);
    hide();
  };

  /**
   * componente a renderizar
   */
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="w-full">
          <CardHeader
            icon={faFile}
            label="Parámetros para la construcción de RRP"
            remove={hide}
          />
          <form id="rrp-form" onSubmit={validateRrpFields}>
            <div className=" flex flex-wrap p-4">
              <div className="w-1/2 text-sm px-2">número de trabajo</div>
              <div className="w-1/2 text-sm px-2">cantidad de productos</div>
              <div className="w-1/2 px-2">
                <input
                  type="number"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                id="work-id"
                name="work-id"
                placeholder="ingresa un número de trabajo válido"
                value={rrpData.workId}
                onChange={(event) => setWorkId(event.target.value)}
                ></input>
              </div>
              <div className=" w-1/2 px-2">
                <input
                  type="number"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                 id="items"
                 name="items"
                 placeholder="ingresa el número de elementos"
                value={rrpData.items}
                onChange={(event) => setItems(event.target.value)}
                ></input>
              </div>
              <div className=" w-full text-sm px-2">incidencia</div>
              <div className=" w-full px-2">
                <textarea
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                id="issue"
                name="issue"
                rows="3"
                cols="30"
                placeholder="Ingrese la incidencia"
                value={rrpData.issue}
                onChange={(event) => setIssue(event.target.value)}
                ></textarea>
              </div>
              <div className=" w-full text-sm px-2">descripción</div>
              <div className=" w-full px-2">
                <textarea
                  type="text"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                id="description"
                name="description"
                rows="5"
                cols="30"
                placeholder="Ingrese una descripción opcional detallada del proceso"
                value={rrpData.description}
                onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
              <div className="w-1/2 text-sm px-2">inicio del setup</div>
              <div className="w-1/2 text-sm px-2">terminación del setup</div>
              <div className="w-1/2 px-2">
                <input
                  type="datetime-local"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="setup-start"
                  name="setup-start"
                  value={rrpData.setupStart}
                  onChange={(event) => setSetupStart(event.target.value)}
                ></input>
              </div>
              <div className=" w-1/2 px-2">
                <input
                  type="datetime-local"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="setup-end"
                  name="setup-end"
                  value={rrpData.setupEnd}
                  onChange={(event) => setSetupEnd(event.target.value)}
                ></input>
              </div>
            </div>
          </form>
          <div className=" flex flex-wrap p-2">
            <div className="w-3/4 flex flex-row"></div>
            <div className="w-1/4">
              <div className="w-11/12">
                <button
                  className="bg-[#215E9B] text-white w-full text-center px-4 my-1 rounded text-sm"
                  type="submit"
                  form="rrp-form"
                >
                  iniciar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default RRPSettings;
