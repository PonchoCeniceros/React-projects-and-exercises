// react utilities
import ReactDOM from "react-dom";
import React, { useEffect } from "react";
import useAPISettings from "./hooks/apiSettings";
// styled and assets
import "./apiSettings.css";
import CardHeader from "styled-components/cardHeader";
import { faGears } from "@fortawesome/free-solid-svg-icons";
// dependencies and utilities.
import { successToast } from "utilities/toast";

const APISettings = ({isOpen, hide}) => {
  const [apiSettings, loadSettings, setIp, setPort, setDatabase, setToken] = useAPISettings();

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("apiSettings"));
    loadSettings(settings);
  }, []);

  const setAPIsettings = (event) => {
    event.preventDefault();
    localStorage.setItem("apiSettings", JSON.stringify(apiSettings));
    successToast("Configuraciones actualizadas");
    hide();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="w-full">
          <CardHeader
            icon={faGears}
            label="Configuración de la API"
            remove={hide}
          />
          <form id="api-configs-form" onSubmit={setAPIsettings}>
            <div className=" flex flex-wrap p-4">
              <div className="w-1/2 text-sm px-2">dirección ip</div>
              <div className="w-1/2 text-sm px-2">puerto</div>
              <div className="w-1/2 px-2">
                <input
                  type="text"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="api-ip"
                  name="api-ip"
                  placeholder="0.0.0.0"
                  value={apiSettings.ip}
                  onChange={(event) => setIp(event.target.value)}
                ></input>
              </div>
              <div className=" w-1/2 px-2">
                <input
                  type="text"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="api-port"
                  name="api-port"
                  placeholder="0000"
                  value={apiSettings.port}
                  onChange={(event) => setPort(event.target.value)}
                ></input>
              </div>
              <div className=" w-full text-sm p-1">base de datos</div>
              <div className=" w-full px-2">
                <input
                  type="text"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="api-database"
                  name="api-database"
                  placeholder="Ingresa el nombre de la base de datos"
                  value={apiSettings.database}
                  onChange={(event) => setDatabase(event.target.value)}
                ></input>
              </div>
              <div className=" w-full text-sm p-1">token de autenticación</div>
              <div className=" w-full px-2">
                <input
                  type="text"
                  className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-sm"
                  id="api-token"
                  name="api-token"
                  placeholder="Ingresa el token de acceso"
                  value={apiSettings.token}
                  onChange={(event) => setToken(event.target.value)}
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
                  form="api-configs-form"
                >
                  aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default APISettings;